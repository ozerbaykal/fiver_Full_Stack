import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";

// --------------Kaydol--------Yeni Hesap oluştur ---------
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //şifreyi salt ve hashle
  const hashedPass = bcrypt.hashSync(req.body.password, 12);

  //kullanıcıyı veri tabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
  });
  //passwordu client a gönderme
  newUser.password = undefined;

  //client'a cavap gönder
  res.status(200).json({ message: "Hesabınız oluşturuldu", data: newUser });
};

// --------------Giriş Yap--------Mevcut hesaba giriş ---------

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //ismine göre kullanıcıyı db ara

  //kullanıcı bulunmazsa hata gönder

  //veritabanındaki haslenmiş şifre ile isteğin body kısmında gelen normal şifreyi karşılaştır

  //şifreler aynı değilse hata gönder

  //şifre doğruysa jwt token oluştur

  //şifre alanını kaldır

  //token ' i client a gönder

  res.status(200).json({ message: "işlem başarılı" });
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
};
