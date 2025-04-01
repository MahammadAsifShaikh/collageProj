import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = express.Router();

// ✅ Route to get all students
router.get("/", getAllStudents);

// ✅ Route to get a student by ID
router.get("/:id", getStudentById);

// ✅ Route to create a new student
router.post("/", createStudent);

// ✅ Route to update a student by ID
router.put("/:id", updateStudent);

// ✅ Route to delete a student by ID
router.delete("/:id", deleteStudent);

export default router;
