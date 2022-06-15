import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from "../lib/jwt.lib";
import SessionModel, { SessionDocument } from "../models/session.model";
import { findUser } from "./user.service";
import config from "config";

export const createSession = async (userId: string, userAgent: string) =>
  (await SessionModel.create({ user: userId, userAgent })).toJSON();

export const findUserSession = async (query: FilterQuery<SessionDocument>) =>
  await SessionModel.find(query).lean();

export const findAndUpdateOneSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => await SessionModel.updateOne(query, update, { new: true });

export const reIssureNewAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: get(session, "user") });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>("accTokenTimeToLive"),
    }
  );

  return accessToken;
};
