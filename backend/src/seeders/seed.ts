const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");
const { User, Admin, Teacher, Student, Role } = require("../models"); // Ensure models are imported correctly
import Principal from "../models/Principal";
// Initialize the Sequelize instance (make sure it's connected)
const sequelize = new Sequelize({
  dialect: "postgres", // Change this based on your DB type
  host: "localhost",
  username: "your_db_username",
  password: "your_db_password",
  database: "your_db_name",
});

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const seedData = async () => {
  try {
    // 1. Clear previous data (optional, to ensure clean start)
    await sequelize.sync({ force: true }); // Forces sync and drops tables before recreating them

    // 2. Create roles (ADMIN, STUDENT, TEACHER, PRINCIPAL)
    const roles = await Promise.all([
      Role.create({ name: "ADMIN" }),
      Role.create({ name: "STUDENT" }),
      Role.create({ name: "TEACHER" }),
      Role.create({ name: "PRINCIPAL" }),
    ]);

    // 3. Create users (20 students, 15 teachers, 3 admins, 2 principals)
    const passwordHash = await hashPassword("Test@123");

    const users = [];

    // 20 students
    for (let i = 0; i < 20; i++) {
      users.push({
        firstName: `StudentFirstName${i}`,
        lastName: `StudentLastName${i}`,
        email: `student${i}@example.com`,
        password: passwordHash,
        roleId: roles[1].id, // Student role
      });
    }

    // 15 teachers
    for (let i = 0; i < 15; i++) {
      users.push({
        firstName: `TeacherFirstName${i}`,
        lastName: `TeacherLastName${i}`,
        email: `teacher${i}@example.com`,
        password: passwordHash,
        roleId: roles[2].id, // Teacher role
      });
    }

    // 3 admins
    for (let i = 0; i < 3; i++) {
      users.push({
        firstName: `AdminFirstName${i}`,
        lastName: `AdminLastName${i}`,
        email: `admin${i}@example.com`,
        password: passwordHash,
        roleId: roles[0].id, // Admin role
      });
    }

    // 2 principals
    for (let i = 0; i < 2; i++) {
      users.push({
        firstName: `PrincipalFirstName${i}`,
        lastName: `PrincipalLastName${i}`,
        email: `principal${i}@example.com`,
        password: passwordHash,
        roleId: roles[3].id, // Principal role
      });
    }

    // 4. Insert users into the DB
    const insertedUsers = await User.bulkCreate(users, { returning: true });

    // 5. Create Admin, Teacher, Principal, and Student records based on the inserted users
    for (const user of insertedUsers) {
      if (user.roleId === roles[1].id) {
        await Student.create({
          userId: user.id,
          course: "Course Name",
          year: 1,
          section: "A",
        });
      } else if (user.roleId === roles[2].id) {
        await Teacher.create({
          userId: user.id,
          subject: "Subject Name",
          department: "Department Name",
        });
      } else if (user.roleId === roles[0].id) {
        await Admin.create({
          userId: user.id,
          roleType: "ADMIN", // Adjust roleType if needed
        });
      } else if (user.roleId === roles[3].id) {
        await Principal.create({
          userId: user.id,
          schoolName: "School Name",
        });
      }
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding data: ", error);
  }
};

// Run the seeding function
seedData();
