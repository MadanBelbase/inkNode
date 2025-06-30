import express from 'express';
import { signup , postLogin ,getProfile} from '../controller/authcontroller';
import { signupValidationRules } from '../validators/signupValidator';
import { loginValidationRules } from '../validators/Loginvalidators';
import { validate } from '../middlewares/validationMiddleware';
import { verifyToken } from '../middlewares/authenticateToken';

const authrouter = express.Router();

authrouter.post('/signup', signupValidationRules, validate, signup);
 authrouter.post('/login',loginValidationRules, postLogin)
authrouter.get("/profile", verifyToken, getProfile);


export default authrouter;