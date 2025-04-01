import { Request, Response, NextFunction } from "express";
import logger from "../config/logger"; // ✅ Import Logger

const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, url, ip } = req;
    const { statusCode } = res;

    logger.info(
      `📥 [${method}] ${url} - ${statusCode} | IP: ${ip} | Time: ${duration}ms`
    );
  });

  next();
};

export default apiLogger;
