import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/httpStatusCodes";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
};
