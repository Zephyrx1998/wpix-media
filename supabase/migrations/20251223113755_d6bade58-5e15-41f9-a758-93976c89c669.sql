-- Drop the plain text email and phone columns since they are now encrypted via trigger
-- The name column will be kept as it's not sensitive PII requiring encryption
-- Email and phone are properly encrypted in email_encrypted and phone_encrypted columns

ALTER TABLE public.leads DROP COLUMN IF EXISTS email;
ALTER TABLE public.leads DROP COLUMN IF EXISTS phone;