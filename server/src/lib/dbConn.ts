import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

const dbConn = async () => {
  const uri = config.get<string>("mongodbURI");

  try {
    await mongoose.connect(uri);
    logger.info("Connected to db ...");
  } catch (err) {
    logger.error("Couldn't connect ot db");
    process.exit(1);
  }
};

export default dbConn;
