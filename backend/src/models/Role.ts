// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config/database"; // Ensure this points to your DB instance

// class Role extends Model {
//   public id!: string;
//   public name!: string;
// }

// // Define the table structure using `init`
// Role.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.ENUM("ADMIN", "PRINCIPAL", "TEACHER", "STUDENT"), // ENUM for predefined roles
//       allowNull: false,
//       unique: true, // Ensure the role names are unique
//     },
//   },
//   {
//     sequelize, // Pass the Sequelize instance
//     modelName: "Role",
//     tableName: "roles",
//     timestamps: true, // Includes createdAt & updatedAt
//     paranoid: true, // Enables soft deletes with deletedAt
//   }
// );

// export default Role;

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Role extends Model {
  public id!: string;
  public name!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("ADMIN", "PRINCIPAL", "TEACHER", "STUDENT"),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
    paranoid: true,
  }
);

export default Role;
