import express, { Application, Request, Response, urlencoded } from "express";
import "dotenv/config";
import { errorHandler } from "../middlerware/errorHandler";

const app: Application = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
// Routes Imports
import {AuthRoute, UserRoute} from '../routes'


// Hook up routes 
app.use('/api/auth', AuthRoute);
app.use('/api/users', UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    msg: "Welcome to Food_Moji",
  });
});

app.use(errorHandler);

export { app };
