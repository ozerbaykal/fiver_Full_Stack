import { NextFunction, Response, Request } from "express";
import c from "../utils/catchAsync.ts";
import Gig from "../models/gig.model.ts";
import { error } from "console";
import { upload } from "../utils/cloudinary.ts";

export const getAllGigs = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const gigs = await Gig.find();

  res.status(200).json({ message: "işlem başarılı", results: gigs.length, gigs });
});

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
});

type ExtendedFiles = {
  coverImage: { path: string }[];
  images: { path: string }[];
};

export const createGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //isteği atan kullanıcının hesabı satıcı hesabı değilse hata döndür
  if (!req.isSeller) return next(error(403, "Sadece seller hesabı hizmet oluşturabilir"));

  // kapak fotoğragının url'si ve diğer fotoğrafların url'lerini al cloudinary e yükle
  const files = req.files as unknown as ExtendedFiles;

  const coverImage = await upload(files.coverImage[0].path, next, "gig-images");

  const promises = files.images.map((image) => upload(image.path, next, "gig-images"));

  //bütün resimleri tek seferde yükleyip sonuçları al
  const images = await Promise.all(promises);

  //resimleri ve kapak resmin url'lerini req.body' ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  //paket özelliklerini virgülle ayrılmış listeye çevir
  req.body.package_features = req.body.package_features.split(",");

  //özellikler metnini ayır diziye çevir
  req.body.package_features = req.body.package_features.split(",");

  //yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.userId });

  //celient a cevap gönder
  res.status(201).json({ message: "hizmet başarıyla oluşturuldu", gig: savedGig });
});

export const deleteGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
});
