import fs from "fs";
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Ensure logs directory exists
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// const LOG_RETENTION_DAYS = process.env.LOG_RETENTION_DAYS || 10;
const LOG_RETENTION_DAYS: number = parseInt(
  process.env.LOG_RETENTION_DAYS || "10",
  10
);

// Winston Logger Configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(logDir, "app-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxFiles: `${LOG_RETENTION_DAYS}d`,
      zippedArchive: false,
    }),
  ],
});

// Cleanup old log files
const cleanOldLogs = () => {
  fs.readdir(logDir, (err, files) => {
    if (err) {
      console.error("Error reading log directory:", err);
      return;
    }

    const now = Date.now();
    const retentionPeriod = LOG_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(logDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        if (now - stats.mtimeMs > retentionPeriod) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting log file:", err);
            } else {
              console.log(`Deleted old log file: ${file}`);
            }
          });
        }
      });
    });
  });
};

// Run cleanup on startup and schedule daily cleanup
cleanOldLogs();
setInterval(cleanOldLogs, 24 * 60 * 60 * 1000); // Every 24 hours

export default logger;
