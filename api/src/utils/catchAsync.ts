//bir fonksiyonu parametre olarak alır,sonra içeride bu fonk çalıştırır,hata olursa hata mw'e yönlendirir.

import { NextFunction, Request, Response } from "express";

//catchAsync fonksiyonu için tip tanımı yapalım

type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
