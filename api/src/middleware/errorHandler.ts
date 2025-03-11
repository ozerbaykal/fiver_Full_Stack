import { NextFunction, Request, Response } from "express";

const errorMiddleware: any = (
  err: { status?: number; message?: String },
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

  //kullanıcıya hata bilgisini gödnder

  const errStatus: number = err.status || 500;
  const errMessage: String = err.message || "Hay aksi! bir şeyler ters gitti";
  return res.status(errStatus).json({ status: "error", statusCode: errStatus, message: errMessage });
};

export default errorMiddleware;
