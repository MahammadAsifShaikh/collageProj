import { Request, Response, NextFunction } from "express";
import logger from "../config/logger"; // ✅ Import Logger
import { INTERNAL_SERVER_ERROR } from "../constants/httpStatusCodes";

const errorHandlerLog = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`❌ Error in [${req.method}] ${req.url} - ${err.message}`);

  res.status(INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
};

export default errorHandlerLog;
