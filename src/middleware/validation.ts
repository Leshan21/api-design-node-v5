import type { Request, Response, NextFunction } from "express";
import  {type  ZodSchema, ZodError } from "zod"; // Ensure zod is imported for side effects if needed
import { fa } from "zod/locales";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = schema.parse(req.body); // Validate the request body against the schema
        req.body = validatedData; // Replace req.body with the validated data
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        if (error instanceof ZodError){
            return res.status(400).json({
                message: "Validation Error",
                details: error.issues.map((e) => ({
                  field: e.path.join('.'),
                  message: e.message,
                }))
            })
        }
        next(error); // Pass any other errors to the next middleware
    }
  }
}

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.params); // Validate the request params against the schema
        next(); // 
    } catch (error) {
        if (error instanceof ZodError){
            return res.status(400).json({
                message: "Invalid Parameters",
                details: error.issues.map((e) => ({
                  field: e.path.join('.'),
                  message: e.message,
                }))
            })
        }
        next(error);
    }
  }
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.query); // Validate the request query against the schema
        next(); // 
    } catch (error) {
        if (error instanceof ZodError){
            return res.status(400).json({
                message: "Invalid Query Parameters",
                details: error.issues.map((e) => ({
                  field: e.path.join('.'),
                  message: e.message,
                }))
            })
        }
        next(error);
    }
  }
}