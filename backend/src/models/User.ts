import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Ensure this points to your DB instance
import Role from "./Role"; // Correct import of the Role model

class User extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: string; // Foreign key referencing Role
}

// Define the table structure using `init`
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role, // References the Role model
        key: "id", // Foreign key references Role's id
      },
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "User",
    tableName: "users",
    timestamps: true, // Includes createdAt & updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
  }
);

// Define associations
User.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // Foreign key relationship
Role.hasMany(User, { foreignKey: "roleId" }); // Role has many Users

export default User;
