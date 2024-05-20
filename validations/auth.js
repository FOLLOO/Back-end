import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').trim().escape().escape().escape().isEmail(),
    body('password', "Пароль меньше 8 символов").isLength({ min: 8 }),
    body('nickname', "Nick Меньше 2 символов").trim().escape().isLength({ min: 2}),
    body('avatarURL',"Не ссылка").optional().isURL(),
    body('role', 'пропишите роль').notEmpty(),
]
export const avtorValidation = [
    // body('email', 'Неверный формат почты').trim().escape().escape().escape().isEmail(),
    // body('password', "Пароль меньше 8 символов").isLength({ min: 8 }),
    // body('nickname', "Nick Меньше 2 символов").trim().escape().isLength({ min: 2}),
    // body('avatarURL',"Не ссылка").optional().isURL(),
    // body('role', 'пропишите роль').notEmpty(),
    body('cost', 'пропишите стоимость').notEmpty(),
    body('descriptions', 'пропишите описание').notEmpty(),
]
