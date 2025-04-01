import { Request, Response } from "express";
import {
  getAllPrincipalsService,
  getPrincipalByIdService,
  createPrincipalService,
  updatePrincipalService,
  deletePrincipalService,
} from "../services/principalService";
import {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from "../constants/httpStatusCodes";
import {
  PRINCIPAL_FETCH_SUCCESS,
  PRINCIPAL_CREATED,
  PRINCIPAL_UPDATED,
  PRINCIPAL_DELETED,
  PRINCIPAL_NOT_FOUND,
  INVALID_PRINCIPAL_ID,
} from "../constants/responseMessages";

// ✅ Get all principals
export const getAllPrincipals = async (req: Request, res: Response) => {
  try {
    const principals = await getAllPrincipalsService();
    res.status(OK).json({ message: PRINCIPAL_FETCH_SUCCESS, data: principals });
  } catch (error) {
    console.error("Error fetching principals:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching principals" });
  }
};

// ✅ Get principal by ID
export const getPrincipalById = async (req: Request, res: Response) => {
  try {
    const principalId = parseInt(req.params.id, 10);
    if (isNaN(principalId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_PRINCIPAL_ID });
      return;
    }

    const principal = await getPrincipalByIdService(principalId);
    if (!principal) {
      res.status(NOT_FOUND).json({ message: PRINCIPAL_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: PRINCIPAL_FETCH_SUCCESS, data: principal });
  } catch (error) {
    console.error("Error fetching principal:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching principal" });
  }
};

// ✅ Create a principal
export const createPrincipal = async (req: Request, res: Response) => {
  try {
    const principal = await createPrincipalService(req.body);
    res.status(CREATED).json({ message: PRINCIPAL_CREATED, data: principal });
  } catch (error) {
    console.error("Error creating principal:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating principal" });
  }
};

// ✅ Update a principal
export const updatePrincipal = async (req: Request, res: Response) => {
  try {
    const principalId = parseInt(req.params.id, 10);
    if (isNaN(principalId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_PRINCIPAL_ID });
      return;
    }

    const updatedPrincipal = await updatePrincipalService(
      principalId,
      req.body
    );
    if (!updatedPrincipal) {
      res.status(NOT_FOUND).json({ message: PRINCIPAL_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: PRINCIPAL_UPDATED, data: updatedPrincipal });
  } catch (error) {
    console.error("Error updating principal:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating principal" });
  }
};

// ✅ Delete a principal
export const deletePrincipal = async (req: Request, res: Response) => {
  try {
    const principalId = parseInt(req.params.id, 10);
    if (isNaN(principalId)) {
      res.status(BAD_REQUEST).json({ message: INVALID_PRINCIPAL_ID });
      return;
    }

    const deleted = await deletePrincipalService(principalId);
    if (!deleted) {
      res.status(NOT_FOUND).json({ message: PRINCIPAL_NOT_FOUND });
      return;
    }

    res.status(OK).json({ message: PRINCIPAL_DELETED });
  } catch (error) {
    console.error("Error deleting principal:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting principal" });
  }
};
