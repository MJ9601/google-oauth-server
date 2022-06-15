import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export const findUser = async (query: FilterQuery<UserDocument>) =>
  await UserModel.findOne(query);

export const findAndUpdateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) => await UserModel.findOneAndUpdate(query, update, options);
