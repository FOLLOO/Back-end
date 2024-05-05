import { body } from 'express-validator';

export const roleCreateValidation = [
    body('title', 'Вы не ввели роль').notEmpty().isLength({ min: 2 }),
]