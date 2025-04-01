import express from "express";
import {
  createPrincipal,
  getAllPrincipals,
  getPrincipalById,
  updatePrincipal,
  deletePrincipal,
} from "../controllers/principalController";

const router = express.Router();

router.post("/", createPrincipal);
router.get("/", getAllPrincipals);
router.get("/:id", getPrincipalById);
router.put("/:id", updatePrincipal);
router.delete("/:id", deletePrincipal);

export default router;
