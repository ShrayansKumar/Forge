import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { AppError } from "../../utils/AppError";
import type { CreateUserInput } from "@forge/shared";

export async function createUser(req: Request, res: Response) {
  const input = req.body as CreateUserInput;

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email));

  if (existing) {
    throw new AppError("A user with this email already exists", 409);
  }

  const [created] = await db
    .insert(users)
    .values({ email: input.email, name: input.name })
    .returning();

  res.status(201).json({ success: true, data: created });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const [user] = await db.select().from(users).where(eq(users.id, id));

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.json({ success: true, data: user });
}