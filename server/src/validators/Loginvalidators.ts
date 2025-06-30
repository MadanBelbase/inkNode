import { body, CustomValidator } from 'express-validator';
export const loginValidationRules = [
body('email').isEmail().withMessage('Invalid email'),
body('password').notEmpty().withMessage('Password is required') 
];
// Custom validation for terms, if neede