import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";


import UserModule from "../models/user.js";
import RoleModule from "../models/role.js";

export const  getAll = async (req, res, next) =>  {
    try {
        const users = await UserModule.find({}).populate('role_id', 'title')
            .exec();

        res.json(users);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось найти пользователей",
        })
    }
}

// Оправить роль наименованием, чтобы сохранить
export const createUser = async (req, res, next) =>  {
    try {
        const passwordHash = await bcrypt.hashSync(req.body.password, 10)

        const roleTitle = req.body.role.toLowerCase();
        const foundRole = await RoleModule.findOne({ title: roleTitle} );

        if (!foundRole) {
            res.status(404).json({message: "Роль не найдена"})
        }
        const doc = new UserModel({
            email: req.body.email,
            passwordHash: passwordHash,
            nickname: req.body.nickname,
            avatarURL: req.body.avatarURL,
            role_id: foundRole._id,
            cost: req.body.cost,
            descriptions: req.body.cost,
        });

        // Сохраняем пользователя в базе данных
        try{
            const userR = await doc.save()

            const token = jwt.sign({
                    _id: doc._id,
                }, process.env.JWT_SECRET,
                {
                    expiresIn: '30d',
                });

            const {passwordHash, ...userData} = userR._doc;

            res.json({
                ...userData,
                token: token,
            })

        }catch(err){
            console.log(err);
            res.status(500).json({message: "Ошибка при сохранении"})
        }

    }
    catch(err){
        res.status(500).json({err, message: 'Не удалось зарегеститроваться'})
        console.log(err)
    }
}

export const getOne = async (req,res) => {
    try{

        const userID = req.userId.id;

        const user = await UserModule.findOne({
            _id: userID
        }).populate('role_id', 'title')
            .exec()

        if (!user){
            res.status(500).json({message: 'Fuck error user is not founded'})
        }

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            // token: token,
        })

        // res.json(user);

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Не удалось найти пользоваетля",
        })
    }
}
export const dropOne = async (req,res,next) => {
    try{
        const userID = req.params.id;

        const user = await UserModule.deleteOne({
            _id: userID
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

export const updateOne = async (req,res,next) => {
    try{
        const userID = req.params.id;

        const passwordHash = await bcrypt.hashSync(req.body.password, 10);
        const roleTitle = req.body.role.toLowerCase();
        const foundRole = await RoleModule.findOne({ title: roleTitle} );

        if (!foundRole) {
            res.status(404).json({message: "Роль не найдена"})
        }


        const user = await UserModule.updateOne({_id: userID},{
            email: req.body.email,
            passwordHash: passwordHash,
            nickname: req.body.nickname,
            avatarURL: req.body.avatarURL,
            cost: req.body.cost,
            role_id: foundRole._id,
            descriptions: req.body.cost,
        })
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


export const login = async (req, res) =>  {
    try{
        const {email, password} = req.body;

        const user = await UserModule.findOne({email: email})
            .populate('role_id', 'title')
            .exec();
        if (!user) {
            return res.status(500).json({message: 'Такого пользователя нет'})
        }

        const isValidPassword = await bcrypt.compare(password,  user._doc.passwordHash)
        if(!isValidPassword){
            return res.status(400).json({message: 'НЕверный логин или пароль'})
        }

        const token = jwt.sign({
                _id: user._id,
                role: user.role_id.title,
            }, process.env.JWT_SECRET,
            {
                expiresIn: '30d',
            });

        const {passwordHash, ...userData} = user._doc;

        return res.json({
            ...userData,
            token: token
        })

    }
    catch(err){
        console.log(err);
        return  res.status(500).json('---Errrror lgon user')
    }
}


