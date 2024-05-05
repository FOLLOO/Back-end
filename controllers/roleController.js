import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";


import RoleModule from "../models/role.js";


export const  getRole = async (req, res, next) =>  {
    try {
        const roles = await RoleModule.find({},)
        res.json(roles);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось найти роли",
        })
    }
}

export const createRole = async (req, res, next) =>  {
    try {
        const role = new RoleModule({
           title: req.body.title.toLowerCase(),
        })

        const roleA = await role.save()

        res.json(roleA)
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось создать роль",
        })
    }
}
    export const getOneRole = async (req,res,next) => {
        try{
            const roleId = req.params.id;

            const status = await RoleModule.findOne({
                _id: roleId
            })
            res.json(status)
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Не удалось найти роль",
            })
        }
    }
    export const dropRole = async (req,res,next) => {
        try{
            const roleId = req.params.id;

            const status = await RoleModule.deleteOne({
                _id: roleId
            })
            res.json({
                success: true
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Не удалось удалить роль",
            })
        }
    }

    export const updateRole = async (req,res,next) => {
        try{
            const roleId = req.params.id;
            const name = req.body.title
            // const dateNow = new DATE() // ХЗ может и сама меняте дату, не заметил если честно
            const status = await RoleModule.updateOne({_id: roleId},{title: name })
            res.json({
                success: true
            })
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                message: "Не удалось добавить статус",
            })
        }
    }



