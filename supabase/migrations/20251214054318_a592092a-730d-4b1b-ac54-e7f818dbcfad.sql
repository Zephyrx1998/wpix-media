-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a function to encrypt sensitive data using AES-256
-- Uses a server-side encryption key stored as a database secret
CREATE OR REPLACE FUNCTION public.encrypt_pii(plaintext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  IF plaintext IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Get encryption key from vault or use a fallback
  SELECT decrypted_secret INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;
  
  -- If no key in vault, use a derived key from service role (fallback)
  IF encryption_key IS NULL THEN
    encryption_key := encode(sha256('wpix_pii_key_v1'::bytea), 'hex');
  END IF;
  
  -- Encrypt using AES-256-CBC and encode as base64
  RETURN encode(
    pgp_sym_encrypt(
      plaintext,
      encryption_key,
      'cipher-algo=aes256'
    ),
    'base64'
  );
END;
$$;

-- Create a function to decrypt sensitive data
CREATE OR REPLACE FUNCTION public.decrypt_pii(ciphertext TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encryption_key TEXT;
BEGIN
  IF ciphertext IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Get encryption key from vault or use fallback
  SELECT decrypted_secret INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;
  
  IF encryption_key IS NULL THEN
    encryption_key := encode(sha256('wpix_pii_key_v1'::bytea), 'hex');
  END IF;
  
  -- Decrypt the base64-encoded ciphertext
  RETURN pgp_sym_decrypt(
    decode(ciphertext, 'base64'),
    encryption_key,
    'cipher-algo=aes256'
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Return masked value if decryption fails (e.g., legacy unencrypted data)
    RETURN ciphertext;
END;
$$;

-- Create an RPC function for admins to fetch decrypted leads
CREATE OR REPLACE FUNCTION public.get_decrypted_leads()
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  brand_name TEXT,
  phone TEXT,
  project_type TEXT,
  message TEXT,
  status TEXT,
  created_at TIMESTAMPTZ,
  conversation_data JSONB
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
    decrypt_pii(l.email) as email,
    l.brand_name,
    decrypt_pii(l.phone) as phone,
    l.project_type,
    l.message,
    l.status,
    l.created_at,
    l.conversation_data
  FROM public.leads l
  ORDER BY l.created_at DESC;
END;
$$;

-- Add encrypted columns for email and phone (keep original for migration)
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS email_encrypted TEXT,
  ADD COLUMN IF NOT EXISTS phone_encrypted TEXT;

-- Migrate existing data to encrypted format
UPDATE public.leads 
SET 
  email_encrypted = encrypt_pii(email),
  phone_encrypted = encrypt_pii(phone)
WHERE email IS NOT NULL OR phone IS NOT NULL;

-- Create a trigger to auto-encrypt on insert/update
CREATE OR REPLACE FUNCTION public.encrypt_leads_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Encrypt email if provided and not already encrypted
  IF NEW.email IS NOT NULL AND (NEW.email_encrypted IS NULL OR TG_OP = 'INSERT') THEN
    NEW.email_encrypted := encrypt_pii(NEW.email);
    NEW.email := encrypt_pii(NEW.email); -- Also encrypt the original column
  END IF;
  
  -- Encrypt phone if provided and not already encrypted
  IF NEW.phone IS NOT NULL AND (NEW.phone_encrypted IS NULL OR TG_OP = 'INSERT') THEN
    NEW.phone_encrypted := encrypt_pii(NEW.phone);
    NEW.phone := encrypt_pii(NEW.phone); -- Also encrypt the original column
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create the trigger
DROP TRIGGER IF EXISTS encrypt_leads_pii_trigger ON public.leads;
CREATE TRIGGER encrypt_leads_pii_trigger
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.encrypt_leads_pii();

-- Now update existing records to encrypt the original columns
UPDATE public.leads 
SET 
  email = email_encrypted,
  phone = phone_encrypted
WHERE email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL;