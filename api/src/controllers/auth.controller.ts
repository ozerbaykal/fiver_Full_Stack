import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.ts";
import { IUser } from "../models/user.model.ts";
import jwt from "jsonwebtoken";
import error from "../utils/error.ts";

// --------------Kaydol--------Yeni Hesap oluştur ---------
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //şifreyi salt ve hashle
  const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

  //kullanıcıyı veri tabanına kaydet
  const newUser = await User.create({
    ...req.body,
    password: hashedPass,
  });
  //passwordu client a gönderme
  const { password, ...userWithoutPass } = newUser;

  //client'a cavap gönder
  res.status(200).json({ message: "Hesabınız oluşturuldu", data: userWithoutPass });
};

// --------------Giriş Yap--------Mevcut hesaba giriş ---------

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  const { password, ...withOutPassword } = user;

  //token ' i client a gönder

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      expires: new Date(Date.now() + 14 * 24 * 3600 * 3600),
    })
    .status(200)
    .json({ message: "Hesaba giriş yapıldı", token, user: withOutPassword });
};

// --------------çıkış Yap--------Oturumu kapat ---------

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie("token").status(200).json({ message: "Hesaptan Çıkış Yapıldı" });
};
