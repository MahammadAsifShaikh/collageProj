// import { DataTypes } from "sequelize";
// import { BaseModel } from "./BaseModel";
// import sequelize from "../config/database";

// export class Principal extends BaseModel {
//   public name!: string;
//   public email!: string;
// }

// Principal.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     sequelize,
//     tableName: "principals",
//     timestamps: true,
//     paranoid: true,
//   }
// );

// import { DataTypes, Model } from "sequelize";
// import sequelize from "../config/database"; // Ensure this points to your DB instance
// import User from "./User"; // Correct import of the User model

// class Principal extends Model {
//   public id!: string;
//   public userId!: string; // Foreign key referencing User
//   public schoolName!: string;
// }

// // Define the table structure using `init`
// Principal.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: User, // References the User model
//         key: "id", // Foreign key references User's id
//       },
//     },
//     schoolName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize, // Pass the Sequelize instance
//     modelName: "Principal",
//     tableName: "principals",
//     timestamps: true, // Includes createdAt & updatedAt
//     paranoid: true, // Enables soft deletes with deletedAt
//   }
// );

// // Define associations
// Principal.belongsTo(User, { foreignKey: "userId", as: "user" }); // Foreign key relationship
// User.hasMany(Principal, { foreignKey: "userId" }); // User has many Principals

// export default Principal;

// src/models/Principal.ts

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Ensure this points to your DB instance
import User from "./User"; // Correct import of the User model

class Principal extends Model {
  public id!: string;
  public userId!: string; // Foreign key referencing User
  public schoolName!: string;
}

// Define the table structure using `init`
Principal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User, // References the User model
        key: "id", // Foreign key references User's id
      },
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Principal",
    tableName: "principals",
    timestamps: true, // Includes createdAt & updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
  }
);

// Define associations
Principal.belongsTo(User, { foreignKey: "userId", as: "user" }); // Foreign key relationship
User.hasMany(Principal, { foreignKey: "userId" }); // User has many Principals

export default Principal; // Use default export
