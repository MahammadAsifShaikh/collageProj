import { Request, Response } from "express";
import {
  getAllTeachersService,
  getTeacherByIdService,
  createTeacherService,
  updateTeacherService,
  deleteTeacherService,
} from "../services/teacherService";
import {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from "../constants/httpStatusCodes";
import {
  TEACHER_FETCH_SUCCESS,
  TEACHER_CREATED,
  TEACHER_UPDATED,
  TEACHER_DELETED,
  TEACHER_NOT_FOUND,
  INVALID_TEACHER_ID,
} from "../constants/responseMessages";

// ✅ Get all teachers
export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await getAllTeachersService();
    res.status(OK).json({ message: TEACHER_FETCH_SUCCESS, data: teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching teachers" });
  }
};

// ✅ Get teacher by ID
export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    if (isNaN(teacherId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_TEACHER_ID });
      return;
    }

    const teacher = await getTeacherByIdService(teacherId);
    if (!teacher) {
      res.status(NOT_FOUND).json({ message: TEACHER_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: TEACHER_FETCH_SUCCESS, data: teacher });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching teacher" });
  }
};

// ✅ Create a teacher
export const createTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await createTeacherService(req.body);
    res.status(CREATED).json({ message: TEACHER_CREATED, data: teacher });
  } catch (error) {
    console.error("Error creating teacher:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating teacher" });
  }
};

// ✅ Update a teacher
export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    if (isNaN(teacherId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_TEACHER_ID });
      return;
    }

    const updatedTeacher = await updateTeacherService(teacherId, req.body);
    if (!updatedTeacher) {
      res.status(NOT_FOUND).json({ message: TEACHER_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: TEACHER_UPDATED, data: updatedTeacher });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating teacher" });
  }
};

// ✅ Delete a teacher
export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacherId = parseInt(req.params.id, 10);
    if (isNaN(teacherId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_TEACHER_ID });
      return;
    }

    const deleted = await deleteTeacherService(teacherId);
    if (!deleted) {
      res.status(NOT_FOUND).json({ message: TEACHER_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: TEACHER_DELETED });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting teacher" });
  }
};
