const { GOOGLE_APPLICATION_CREDENTIALS_BASE64 } = process.env;

if (GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
  const serviceAccount = Buffer.from(
    GOOGLE_APPLICATION_CREDENTIALS_BASE64,
    "base64",
  ).toString();
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON = serviceAccount;
}
