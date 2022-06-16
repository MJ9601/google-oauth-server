import { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
