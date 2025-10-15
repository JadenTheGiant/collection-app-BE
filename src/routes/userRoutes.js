import express from "express";
import { getUsers, updateCard } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/:id", updateCard);

export default router;
