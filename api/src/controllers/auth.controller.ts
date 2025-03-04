import { NextFunction, Response, Request } from "express";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
};
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
};
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
};
