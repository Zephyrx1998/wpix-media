-- Step 1: Drop the plain text email and phone columns that contain unencrypted PII
-- The encrypted versions (email_encrypted, phone_encrypted) will be used instead

-- First, update the encrypt_leads_pii trigger to work with only encrypted columns
DROP FUNCTION IF EXISTS public.encrypt_leads_pii() CASCADE;

-- Create a new trigger function that encrypts email and phone on insert/update
CREATE OR REPLACE FUNCTION public.encrypt_leads_pii()
RETURNS TRIGGER AS $$
BEGIN
  -- Encrypt email if provided and store in email_encrypted
  IF NEW.email IS NOT NULL THEN
    NEW.email_encrypted := encrypt_pii(NEW.email);
    NEW.email := NULL; -- Clear the plain text field
  END IF;
  
  -- Encrypt phone if provided and store in phone_encrypted
  IF NEW.phone IS NOT NULL THEN
    NEW.phone_encrypted := encrypt_pii(NEW.phone);
    NEW.phone := NULL; -- Clear the plain text field
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger to run before insert or update
CREATE TRIGGER encrypt_leads_pii_trigger
BEFORE INSERT OR UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.encrypt_leads_pii();

-- Update the get_decrypted_leads function to use the encrypted columns
CREATE OR REPLACE FUNCTION public.get_decrypted_leads()
RETURNS TABLE(
  id uuid, 
  name text, 
  email text, 
  brand_name text, 
  phone text, 
  project_type text, 
  message text, 
  status text, 
  created_at timestamp with time zone, 
  conversation_data jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if user has admin role
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  RETURN QUERY
  SELECT 
    l.id,
    l.name,
    decrypt_pii(l.email_encrypted) as email,
    l.brand_name,
    decrypt_pii(l.phone_encrypted) as phone,
    l.project_type,
    l.message,
    l.status,
    l.created_at,
    l.conversation_data
  FROM public.leads l
  ORDER BY l.created_at DESC;
END;
$$;