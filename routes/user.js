
import express from "express";

import {createUser, dropOne, getAll, getOne, updateOne, login, getOneAvtor} from "../controllers/userController.js";

import { registerValidation, avtorValidation } from "../validations/auth.js";
import validationErrors from "../utils/validationErrors.js";

import checkAuth from "../utils/checkAuth.js";

const router = express.Router();


router.get("/", getAll);
router.get("/me", checkAuth, getOne);
router.get("/avtor/:id", checkAuth, getOneAvtor);

router.delete("/:id", dropOne);

router.post("/login", login);
router.post("/register",registerValidation, validationErrors, createUser);

router.patch("/update",checkAuth, avtorValidation, validationErrors, updateOne);

export default router;
