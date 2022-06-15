import express from "express";
import cors from "cors";
import config from "config";
import cookieParser from "cookie-parser";
import routes from "./routes";

const server = () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: config.get<string>("origin"),
    })
  );
  app.use(cookieParser());
  app.use(express.json());

  routes(app);

  return app;
};

export default server;
