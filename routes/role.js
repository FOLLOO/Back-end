
import express from "express";
import {getRole, createRole, getOneRole, updateRole, dropRole} from '../controllers/roleController.js';

import { roleCreateValidation } from "../validations/role.js";
import validationErrors from "../utils/validationErrors.js";


const router = express.Router();


// router.get("/", (req, res) => {
//     res.json({ message: "Welcome to GimlyGM" });
// });

router.get("/", getRole);
router.get("/:id", getOneRole);

router.delete("/:id", dropRole);

router.post("/add",roleCreateValidation, validationErrors, createRole);
router.patch("/:id",roleCreateValidation, validationErrors, updateRole);

export default router;
