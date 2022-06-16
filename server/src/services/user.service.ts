import axios from "axios";
import config from "config";
import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import qs from "qs";
import logger from "../lib/logger";
import { GoogleOAuth2TokenResults } from "../../typing";

export const findUser = async (query: FilterQuery<UserDocument>) =>
  await UserModel.findOne(query);

export const findAndUpdateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) => await UserModel.findOneAndUpdate(query, update, options);

export const getGoogleOAuth2Tokens = async (
  code: string
): Promise<GoogleOAuth2TokenResults> => {
  const uri = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: config.get<string>("clientId"),
    client_secret: config.get<string>("clientSecret"),
    grant_type: "authorization_code",
    redirect_uri: config.get<string>("oAuth2RedirectUrl"),
  };

  try {
    return (
      await axios.post<GoogleOAuth2TokenResults>(uri, qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    ).data;
  } catch (err: any) {
    logger.error(err, "Failed in fetch GoogleOAuth!");
    return err.message;
  }
};
