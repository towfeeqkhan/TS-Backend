import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(err);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // mongoose invalid objectId format
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid Id format";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
