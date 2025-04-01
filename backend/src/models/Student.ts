import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Ensure this points to your DB instance
import User from "./User"; // Correct import of the User model

class Student extends Model {
  public id!: string;
  public userId!: string; // Foreign key referencing User
  public course!: string;
  public year!: number;
  public section!: string;
}

// Define the table structure using `init`
Student.init(
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
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "Student",
    tableName: "students",
    timestamps: true, // Includes createdAt & updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
  }
);

// Define associations
Student.belongsTo(User, { foreignKey: "userId", as: "user" }); // Foreign key relationship
User.hasMany(Student, { foreignKey: "userId" }); // User has many Students

export default Student;
