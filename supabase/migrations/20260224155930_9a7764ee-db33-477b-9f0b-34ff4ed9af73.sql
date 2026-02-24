
-- Store encryption key in vault using a simple hex string
SELECT vault.create_secret('a]3f8b2e9d1c4a7f6e0b5d8c3a9f2e1d7b4c6a0e5f8d2b9c1a7e3f6d0b4c8a', 'pii_encryption_key');
