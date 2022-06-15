import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../lib/jwt.lib";
import { reIssureNewAccessToken } from "../services/session.service";

const deserilizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "cookies.accessToken");
  const refreshToken = get(req, "cookies.refreshToken");

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssureNewAccessToken({ refreshToken });
    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, {
        maxAge: 9e5,
        httpOnly: true,
        domain: "localhost",
        sameSite: "lax",
        path: "/",
        secure: false,
      });
    }

    const result = verifyJwt(newAccessToken as string);
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserilizeUser;
