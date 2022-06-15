import { StatusCodes } from "http-status-codes";
import { Express, Request, Response } from "express";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) =>
    res.status(StatusCodes.OK).send(`Server is running on PORT 8080`)
  );
};

export default routes;
