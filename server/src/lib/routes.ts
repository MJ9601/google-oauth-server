import { StatusCodes } from "http-status-codes";
import { Express, Request, Response } from "express";
import requiringUser from "../middleware/requiringUser";
import { getMe } from "../controllers/user.controller";
import { googleOauth2Handler } from "../controllers/session.controller";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) =>
    res.status(StatusCodes.OK).send(`Server is running on PORT 8080`)
  );
  app.get("/api/sessions/oauth2/google", googleOauth2Handler);
  app.get("/api/users/me", requiringUser, getMe);
};

export default routes;
