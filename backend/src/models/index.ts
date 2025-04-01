import sequelize from "../config/database"; // Import your sequelize instance
import { Sequelize } from "sequelize-typescript";

// Automatically load models from the directory
const models = [
  require("./Role").default,
  require("./User").default,
  require("./Student").default,
  require("./Teacher").default,
  require("./Admin").default,
  require("./Principal").default,
];

// Add all models to sequelize
models.forEach((model) => sequelize.addModels([model]));

export { sequelize };
