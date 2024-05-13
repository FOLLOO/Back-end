
import express from "express";

import {createUser, dropOne, getAll, getOne, updateOne, login} from "../controllers/userController.js";

import { registerValidation } from "../validations/auth.js";
import validationErrors from "../utils/validationErrors.js";

import checkAuth from "../utils/checkAuth.js";

const router = express.Router();


router.get("/", getAll);
router.get("/:id",checkAuth, getOne);

router.delete("/:id", dropOne);

router.post("/login", login);
router.post("/register",registerValidation, validationErrors, createUser);
router.patch("/:id",registerValidation, validationErrors, updateOne);

export default router;
