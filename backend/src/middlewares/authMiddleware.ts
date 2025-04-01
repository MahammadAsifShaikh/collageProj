// import { Request, Response, NextFunction } from "express";
// import { verifyToken } from "../utils/auth";
// import { UNAUTHORIZED, FORBIDDEN } from "../constants/httpStatusCodes";

// // ✅ Extend Request type to include user
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: any;
//   }
// }

// export const authenticateUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     res.status(UNAUTHORIZED).json({ message: "No token provided" });
//     return;
//   }

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded; // Store decoded user info in request object
//     next(); // ✅ Ensure next() is called
//   } catch (error) {
//     res.status(FORBIDDEN).json({ message: "Invalid token" });
//   }
// };
