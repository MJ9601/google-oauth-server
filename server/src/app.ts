import "dotenv/config";
import config from "config";
import server from "./lib/server";
import logger from "./lib/logger";
import dbConn from "./lib/dbConn";

const app = server();

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`server is running on PORT ${port}`);

  await dbConn();
});
