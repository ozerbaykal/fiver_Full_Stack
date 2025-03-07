import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.ts";
import { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import error from "../utils/error.ts";
import catchAsync from "../utils/catchAsync.ts";

// --------------Kaydol--------Yeni Hesap oluştur ---------
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //şifreyi salt ve hashle
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  //kullanıcıyı veri tabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
  });
  //passwordu client a gönderme
  newUser.password = "";

  //client'a cavap gönder
  res.status(200).json({ message: "Hesabınız oluşturuldu", data: newUser });
});
// --------------Giriş Yap--------Mevcut hesaba giriş ---------

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //ismine göre kullanıcıyı db ara
  const user: IUser | null = await User.findOne({ username: req.body.username });
  //kullanıcı bulunmazsa hata gönder
  if (!user) {
    return next(error(404, "Girdiğiniz Bilgler Hatalı"));
  }

  //veritabanındaki haslenmiş şifre ile isteğin body kısmında gelen normal şifreyi karşılaştır
  const isCorrect = bcrypt.compareSync(req.body.password, user.password);

  //şifreler aynı değilse hata gönder
  if (!isCorrect) {
    res.status(404).json({ message: "Şifre Yanlış" });
    return;
  }

  //şifre doğruysa jwt token oluştur
  const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_DURATION as string | any,
  });

  //şifre alanını kaldır
  user.password = "";

  //token ' i client a gönder

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + 14 * 24 * 3600 * 3600),
    })
    .status(200)
    .json({ message: "Hesaba giriş yapıldı", token, user: user });
});

// --------------çıkış Yap--------Oturumu kapat ---------

export const logout = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "Hesaptan Çıkış Yapıldı" });
});

// --------------Profil bilgilerini al ---------------
export const profile = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "Profil bilgileri alındı" });
});
