export default {
  origin: process.env.ORIGIN || "http://localhost:3000",
  port: process.env.PORT || 8080,
  mongodbURI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googleApis",
  numberOfSalt: 10,
  accTokenTimeToLive: "15m",
  refTokenTimeToLive: "1y",
  privateKey: process.env.JWT_PRIVATE_KEY as string,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGS3NfUGCGCK/j9FP6P8dMq5CaAi
g3lX8fOc1HJekMlPbA/u3AMkTXgfZPap4HQG8hhIAhER7R2MZpt7a44VCwWa3TXz
kOLKyEWtg/yF88REQ3rsllb0oRKi4qx3sLtmRgchqmemk91YrgjI8aE3QZwrNSrN
/M2RJ3Jqfky1uQb9AgMBAAE=
-----END PUBLIC KEY-----`,
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  oAuth2RedirectUrl: process.env.OAUTH2_REDIRECT_URL as string,
};
