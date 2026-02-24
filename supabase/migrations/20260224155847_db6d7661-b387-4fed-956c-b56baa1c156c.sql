
-- Update encrypt_pii to remove hardcoded fallback
CREATE OR REPLACE FUNCTION public.encrypt_pii(plaintext text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  encryption_key TEXT;
BEGIN
  IF plaintext IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT decrypted_secret INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;
  
  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not configured in vault. Cannot encrypt PII.';
  END IF;
  
  RETURN encode(
    pgp_sym_encrypt(
      plaintext,
      encryption_key,
      'cipher-algo=aes256'
    ),
    'base64'
  );
END;
$function$;

-- Update decrypt_pii to remove hardcoded fallback
CREATE OR REPLACE FUNCTION public.decrypt_pii(ciphertext text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  encryption_key TEXT;
BEGIN
  IF ciphertext IS NULL THEN
    RETURN NULL;
  END IF;
  
  SELECT decrypted_secret INTO encryption_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;
  
  IF encryption_key IS NULL THEN
    RAISE EXCEPTION 'Encryption key not configured in vault. Cannot decrypt PII.';
  END IF;
  
  RETURN pgp_sym_decrypt(
    decode(ciphertext, 'base64'),
    encryption_key,
    'cipher-algo=aes256'
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN ciphertext;
END;
$function$;
