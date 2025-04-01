import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import multer from "multer";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";

import sequelize from "./config/database";
import studentRoutes from "./routes/studentRoutes";
import adminRoutes from "./routes/adminRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import principalRoutes from "./routes/principalRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./config/logger"; // it will be needed don't delete it
// import apiLogger from "./middlewares/apiLogger"; // it is global error logger don't delete it
// import errorHandlerLog from "./middlewares/errorLogger"; // it is global error logger don't delete it

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS
app.use(cors());

// ✅ Parse JSON and URL Encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session Management
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

// ✅ File Upload Configuration
const upload = multer({
  dest: "uploads/", // Uploads stored here
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    res.json({ message: "File uploaded successfully", file: req.file });
  }
);

// global error logger
// app.use(apiLogger); // ✅ Logs all API requests and responses don't delete it
// app.use(errorHandlerLog); // ✅ Logs errors in all API requests don't delete it

// ✅ Load Swagger JSON dynamically
const swaggerPath = path.join(__dirname, "config", "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

// ✅ Serve Swagger UI before invalid route handling
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//TODO comment it after testing
// app.get("/test-log", (req, res) => {
//   logger.info("✅ Info: This is a test log.");
//   logger.warn("⚠️ Warning: Testing a warning log.");
//   logger.error("❌ Error: Simulating an error log.");
//   logger.debug("📌 Debug : Test for debug type");

//   res.json({ message: "Logs have been recorded!" });
// });

// ✅ Global Error Handling
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error("Error:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });
app.use(errorHandler);

// // ✅ Load Swagger JSON dynamically to avoid module import issues
// const swaggerPath = path.join(__dirname, "config", "swagger.json");
// const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const API_PREFIX = "/api/v1";

// API Versioning and Routing
const apiRouter = express.Router();
apiRouter.use("/students", studentRoutes);
apiRouter.use("/admins", adminRoutes);
apiRouter.use("/teachers", teacherRoutes);
apiRouter.use("/principals", principalRoutes);

app.use(API_PREFIX, apiRouter);

// ✅ Invalid Route Handling
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found!!!" });
});

// Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
