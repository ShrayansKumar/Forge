import { Router } from "express";
import { createUserSchema } from "@forge/shared";
import { validateBody } from "../../middlewares/validateRequest.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { createUser, getUserById } from "./users.controller";

export const usersRouter = Router();

usersRouter.post(
  "/",
  validateBody(createUserSchema),
  asyncHandler(createUser)
);

usersRouter.get("/:id", asyncHandler(getUserById));