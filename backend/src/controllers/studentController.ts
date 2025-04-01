import { Request, Response } from "express";
import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentService";
import {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from "../constants/httpStatusCodes";
import {
  STUDENT_FETCH_SUCCESS,
  STUDENT_CREATED,
  STUDENT_UPDATED,
  STUDENT_DELETED,
  STUDENT_NOT_FOUND,
  INVALID_STUDENT_ID,
} from "../constants/responseMessages";

// ✅ Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    console.log("hi >>>>>>>>> ");
    const students = await getAllStudentsService();
    res.status(OK).json({ message: STUDENT_FETCH_SUCCESS, data: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching students" });
  }
};

// ✅ Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    if (isNaN(studentId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_STUDENT_ID });
      return;
    }

    const student = await getStudentByIdService(studentId);
    if (!student) {
      res.status(NOT_FOUND).json({ message: STUDENT_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: STUDENT_FETCH_SUCCESS, data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching student" });
  }
};

// ✅ Create a student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await createStudentService(req.body);
    res.status(CREATED).json({ message: STUDENT_CREATED, data: student });
  } catch (error) {
    console.error("Error creating student:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating student" });
  }
};

// ✅ Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    if (isNaN(studentId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_STUDENT_ID });
      return;
    }

    const updatedStudent = await updateStudentService(studentId, req.body);
    if (!updatedStudent) {
      res.status(NOT_FOUND).json({ message: STUDENT_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: STUDENT_UPDATED, data: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating student" });
  }
};

// ✅ Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id, 10);
    if (isNaN(studentId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_STUDENT_ID });
      return;
    }

    const deleted = await deleteStudentService(studentId);
    if (!deleted) {
      res.status(NOT_FOUND).json({ message: STUDENT_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: STUDENT_DELETED });
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting student" });
  }
};
