import express from "express";
import {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController";

const teacherRouter = express.Router();

teacherRouter.post("/", createTeacher);
teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:id", getTeacherById);
teacherRouter.put("/:id", updateTeacher);
teacherRouter.delete("/:id", deleteTeacher);

export default teacherRouter;
