import { CookieOptions, Request, Response } from "express";
import logger from "../lib/logger";
import {
  findAndUpdateUser,
  getGoogleOAuth2Tokens,
} from "../services/user.service";
import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { GoogleOAuthTokenDecoded } from "../../typing";
import { StatusCodes } from "http-status-codes";
import { createSession } from "../services/session.service";
import { signJwt } from "../lib/jwt.lib";

const accessTokenOptions: CookieOptions = {
  maxAge: 9e5,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};
const refreshTokenOptions: CookieOptions = {
  ...accessTokenOptions,
  maxAge: 3.154e10,
};

export const googleOauth2Handler = async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const { id_token, access_token } = await getGoogleOAuth2Tokens(
      code as string
    );
    const decoded = jwt.decode(id_token);
    const userInfo = decoded as GoogleOAuthTokenDecoded | any;
    if (!userInfo?.email_verified) {
      return res.status(StatusCodes.FORBIDDEN).send("Email is not verified!");
    }
    const user = await findAndUpdateUser(
      { email: userInfo?.email },
      {
        email: userInfo?.email,
        username: userInfo?.name,
        picture: userInfo?.picture,
        profileVerified: true,
      },
      { new: true, upsert: true }
    );
    if (!user)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong!");

    const _user = user.toJSON();
    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = signJwt(
      { ..._user, session: session._id },
      { expiresIn: config.get("accTokenTimeToLive") }
    );
    const refreshToken = signJwt(
      { ..._user, session: session._id },
      { expiresIn: config.get("refTokenTimeToLive") }
    );
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    return res
      .status(StatusCodes.ACCEPTED)
      .redirect(`${config.get<string>("origin")}`);
  } catch (err) {
    return res.redirect(`${config.get<string>("origin")}/signin`);
  }
};
