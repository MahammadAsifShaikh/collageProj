import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Ensure this points to your DB instance
import User from "./User"; // Correct import of the User model

class Admin extends Model {
  public id!: string;
  public userId!: string; // Foreign key referencing User
  public roleType!: "SUPER_ADMIN" | "ADMIN"; // Enum for role type
}

// Define the table structure using `init`
Admin.init(
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
    roleType: {
      type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN"),
      allowNull: false,
      defaultValue: "ADMIN", // Default role type is "ADMIN"
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Admin",
    tableName: "admins",
    timestamps: true, // Includes createdAt & updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
  }
);

// Define associations
Admin.belongsTo(User, { foreignKey: "userId", as: "user" }); // Foreign key relationship
User.hasMany(Admin, { foreignKey: "userId" }); // User has many Admins

export default Admin;
