import { NextFunction, Response, Request } from "express";

export const getAllGigs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
};
