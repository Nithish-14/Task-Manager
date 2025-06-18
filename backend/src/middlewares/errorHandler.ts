// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.stack); // Log the error

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
}
