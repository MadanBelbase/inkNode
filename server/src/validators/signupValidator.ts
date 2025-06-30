import { body, CustomValidator } from 'express-validator';

export const signupValidationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),

  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
    .isLength({ min: 4, max: 15 })
    .withMessage('Username must be between 4 and 15 characters'),

  body('email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('phone')
    .isMobilePhone('any') // You can specify locale like 'en-US' for stricter validation
    .withMessage('Invalid phone number'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain a special character'),

  body('confirmPassword').custom((value, { req, path }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  body('terms')
    .custom(value => value === true || value === 'true')  // Accept boolean true or string 'true'
    .withMessage('You must accept the terms'),
];
