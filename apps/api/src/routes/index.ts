import { Router } from "express";
import { usersRouter } from "../modules/users/users.routes";

export const apiRouter = Router();

apiRouter.use("/users", usersRouter);