const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "College Management System API",
    description: "API documentation for the College Management System",
    version: "1.0.0",
  },
  host: "localhost:5000",
  basePath: "/api/v1",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./swagger.json"; // File to generate
const routes = ["./src/index.ts", "../../src/routes/adminRoutes.ts"]; // Entry point where all routes are defined

swaggerAutogen(outputFile, routes).then(() => {
  console.log("✅ Swagger JSON generated!");
});
