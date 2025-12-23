-- Update the trigger function since email and phone columns were dropped
-- Now we just need to encrypt the data that comes in via temporary handling

DROP FUNCTION IF EXISTS public.encrypt_leads_pii() CASCADE;

-- The trigger is no longer needed since we encrypt in the edge function directly
-- Instead, we'll keep the encrypt/decrypt functions but remove the trigger