import { body } from 'express-validator';

export const postsCreateValidation = [
    body('title', 'Нет загаловка').notEmpty().isLength({ min: 2 }),
    body('description', 'Нет описания').notEmpty().isLength({ min: 2 }),
    body('contents', 'Нет контента').notEmpty().isLength({ min: 2 }),
]