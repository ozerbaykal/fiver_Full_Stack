import { NextFunction, Request, Response } from "express";
import error from "../utils/error.ts";
import jwt, { JwtPayload } from "jsonwebtoken";
//client taradından çerezler veya headerla gelen jwt token in geçerliliğini kontrol edicez ve eğer geçersizse hata gönder geçerliyse kullanıcı bilgilerini req nesnesi içine kaydet

type ExtendedPayload = { id: string; isSeller: boolean } & JwtPayload;

const protect = (req: Request, res: Response, next: NextFunction) => {
  //1) çerezler / header'la gelen token a eriş
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  //2 token yoksa hata ver
  if (!token) next(error(423, "Yetkiniz bulunmuyor"));

  //3 token geçerliliğini kontrol et

  jwt.verify(token as string, process.env.JWT_KEY as string, (err, payload) => {
    //4 geçersizse hata gönder
    if (err) return next(error(403, "Tokeniniz geçersiz veya süresi dolmuş"));
    //5 eğer token geçerliyse req nesnesi içerisine kullanıcı bilgilerini ekle
    req.userId = (payload as ExtendedPayload).id;
    req.isSeller = (payload as ExtendedPayload).isSeller;

    //sonraki aşamaya devam et

    next();
  });
};
export default protect;
