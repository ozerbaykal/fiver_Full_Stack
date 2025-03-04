import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: { status?: Number; message?: String },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Hata meydana geldi");
  console.error("Hata detayları", {
    message: err.message || "Bilinmeyen hata",
    status: err.status || 500,
    stack: (err as Error).stack || "Stack bilgisi yok",
  });
};

export default errorMiddleware;
