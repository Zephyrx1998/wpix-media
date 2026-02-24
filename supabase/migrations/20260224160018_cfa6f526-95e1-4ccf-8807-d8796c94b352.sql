
-- Re-encrypt existing data: decrypt with old key, encrypt with new vault key
-- Old key was: encode(sha256('wpix_pii_key_v1'::bytea), 'hex')

DO $$
DECLARE
  old_key TEXT;
  new_key TEXT;
  rec RECORD;
  decrypted_val TEXT;
BEGIN
  old_key := encode(sha256('wpix_pii_key_v1'::bytea), 'hex');
  
  SELECT decrypted_secret INTO new_key
  FROM vault.decrypted_secrets
  WHERE name = 'pii_encryption_key'
  LIMIT 1;
  
  IF new_key IS NULL THEN
    RAISE EXCEPTION 'New encryption key not found in vault';
  END IF;

  -- Re-encrypt leads table
  FOR rec IN SELECT id, email_encrypted, phone_encrypted FROM public.leads WHERE email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL
  LOOP
    BEGIN
      IF rec.email_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.email_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.leads SET email_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
      IF rec.phone_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.phone_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.leads SET phone_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Skip rows that can't be decrypted (may already use new key or be corrupted)
      NULL;
    END;
  END LOOP;

  -- Re-encrypt contact_leads table
  FOR rec IN SELECT id, email_encrypted, phone_encrypted FROM public.contact_leads WHERE email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL
  LOOP
    BEGIN
      IF rec.email_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.email_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.contact_leads SET email_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
      IF rec.phone_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.phone_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.contact_leads SET phone_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END LOOP;

  -- Re-encrypt fellowship_applications table
  FOR rec IN SELECT id, email_encrypted, phone_encrypted FROM public.fellowship_applications WHERE email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL
  LOOP
    BEGIN
      IF rec.email_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.email_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.fellowship_applications SET email_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
      IF rec.phone_encrypted IS NOT NULL THEN
        decrypted_val := pgp_sym_decrypt(decode(rec.phone_encrypted, 'base64'), old_key, 'cipher-algo=aes256');
        UPDATE public.fellowship_applications SET phone_encrypted = encode(pgp_sym_encrypt(decrypted_val, new_key, 'cipher-algo=aes256'), 'base64') WHERE id = rec.id;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END LOOP;
END;
$$;
