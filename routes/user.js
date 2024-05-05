
import express from "express";

import {createUser, dropOne, getAll, getOne, updateOne} from "../controllers/userController.js";

import { registerValidation } from "../validations/auth.js";
import validationErrors from "../utils/validationErrors.js";

const router = express.Router();


router.get("/", getAll);
router.get("/:id", getOne);

router.delete("/:id", dropOne);

router.post("/register",registerValidation, validationErrors, createUser);
router.patch("/:id",registerValidation, validationErrors, updateOne);

export default router;
