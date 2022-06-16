import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GoogleOAuthTokenDecoded } from "../../typing";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const signJwt = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) =>
  jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message,
      decoded: null,
    };
  }
};
