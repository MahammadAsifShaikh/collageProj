import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Ensure this points to your DB instance
import User from "./User"; // Correct import of the User model

class Teacher extends Model {
  public id!: string;
  public userId!: string; // Foreign key referencing User
  public subject!: string;
  public department!: string;
}

// Define the table structure using `init`
Teacher.init(
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
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: true, // Includes createdAt & updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
  }
);

// Define associations
Teacher.belongsTo(User, { foreignKey: "userId", as: "user" }); // Foreign key relationship
User.hasMany(Teacher, { foreignKey: "userId" }); // User has many Teachers

export default Teacher;
