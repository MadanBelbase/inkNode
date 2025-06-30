import express, { Application } from 'express';
import cors from 'cors';
import  userRouter  from './routes/userRouter'; // Import userRouter
import authrouter from './routes/auth';
import blogrouter from './routes/Blog';

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: 'http://localhost:5173' ,credentials: true , 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  preflightContinue: false 
}));
// Routes
app.use(userRouter);
app.use("/auth",authrouter);
app.use("/api", blogrouter);

export default app;
