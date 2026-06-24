import type { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { AppError } from "../utils/AppError";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal server error";

  if (isAppError) {
    logger.warn({ statusCode, path: req.originalUrl }, message);
  } else {
    logger.error({ err, path: req.originalUrl }, "Unhandled error");
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV !== "production" && !isAppError
        ? { stack: (err as Error)?.stack }
        : {}),
    },
  });
}