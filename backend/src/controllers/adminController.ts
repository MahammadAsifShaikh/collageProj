import { Request, Response } from "express";
import logger from "../config/logger"; // ✅ Import Logger
import {
  getAllAdminsService,
  getAdminByIdService,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from "../services/adminService";
import {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from "../constants/httpStatusCodes";
import {
  ADMIN_FETCH_SUCCESS,
  ADMIN_CREATED,
  ADMIN_UPDATED,
  ADMIN_DELETED,
  ADMIN_NOT_FOUND,
  INVALID_ADMIN_ID,
} from "../constants/responseMessages";
import { error } from "console";

// ✅ Get all admins
export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    // throw new Error("Cannot calculate the square root of a negative number.");
    logger.info(`📌 API Called: [GET] ${req.url}`);
    const admins = await getAllAdminsService();
    logger.debug(`✅ Response Data: ${JSON.stringify(admins)}`);
    res.status(OK).json({ message: ADMIN_FETCH_SUCCESS, data: admins });
  } catch (error) {
    const err = error as Error; // ✅ Typecast to Error
    console.error("Error fetching admins:", error);
    logger.error(
      `❌ Error fetching admins: ${err.message} requested api is : ${req.url}`
    );
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching admins" });
  }
};

// ✅ Get admin by ID
export const getAdminById = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.id, 10);
    if (isNaN(adminId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_ADMIN_ID });
      return;
    }

    const admin = await getAdminByIdService(adminId);
    if (!admin) {
      res.status(NOT_FOUND).json({ message: ADMIN_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: ADMIN_FETCH_SUCCESS, data: admin });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error fetching admin" });
  }
};

// ✅ Create an admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await createAdminService(req.body);
    res.status(CREATED).json({ message: ADMIN_CREATED, data: admin });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error creating admin" });
  }
};

// ✅ Update an admin
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.id, 10);
    if (isNaN(adminId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_ADMIN_ID });
      return;
    }

    const updatedAdmin = await updateAdminService(adminId, req.body);
    if (!updatedAdmin) {
      res.status(NOT_FOUND).json({ message: ADMIN_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: ADMIN_UPDATED, data: updatedAdmin });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error updating admin" });
  }
};

// ✅ Delete an admin
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = parseInt(req.params.id, 10);
    if (isNaN(adminId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_ADMIN_ID });
      return;
    }

    const deleted = await deleteAdminService(adminId);
    if (!deleted) {
      res.status(NOT_FOUND).json({ message: ADMIN_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: ADMIN_DELETED });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error deleting admin" });
  }
};
