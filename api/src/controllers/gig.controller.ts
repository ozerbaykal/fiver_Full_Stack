import { NextFunction, Response, Request } from "express";
import c from "../utils/catchAsync.ts";
import Gig from "../models/gig.model.ts";
import { error } from "console";
import { upload } from "../utils/cloudinary.ts";
import { ExtendedFiles } from "../types/index.ts";

type Query = {
  category?: string;
  min?: number;
  max?: number;
  search?: string;
  userID?: string;
};
type Filter = {
  user?: string;
  category?: string;
  price?: { $gte?: number; $lte?: number };
  title?: {
    $regex: string;
    $options: "i";
  };
};
const buildFiltes = (query: Query) => {
  let filters: Filter = {};

  if (query.userID) filters.user = query.userID;

  if (query.category) filters.category = query.category;

  if (query.min || query.max) {
    filters.price = {};
    if (query.min) filters.price.$gte = query.min;
    if (query.max) filters.price.$lte = query.max;
  }

  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

export const getAllGigs = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filters = buildFiltes(req.query);

  console.log("QUERY", req.query);
  console.log("FİLTERS", filters);

  const gigs = await Gig.find(filters).populate("user", "username photo");

  if (gigs.length === 0) return next(error(404, "Hiç bir hizmet bulunamadı"));
  res.status(200).json({ message: "işlem başarılı", results: gigs.length, gigs });
});

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
});

export const createGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //isteği atan kullanıcının hesabı satıcı hesabı değilse hata döndür
  if (!req.isSeller) return next(error(403, "Sadece seller hesabı hizmet oluşturabilir"));

  // kapak fotoğragının url'si ve diğer fotoğrafların url'lerini al cloudinary e yükle
  const files = req.files as unknown as ExtendedFiles;

  const coverImage = await upload(files.coverImage[0].path, next, "gig-images");

  //diğer fotoğraflariçin promise oluştur
  const promises = files.images.map((image) => upload(image.path, next, "gig-images"));

  //bütün resimleri tek seferde yükleyip sonuçları al
  const images = await Promise.all(promises);

  //resimleri ve kapak resmin url'lerini req.body' ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  //paket özelliklerini virgülle ayrılmış listeye çevir
  req.body.package_features = req.body.package_features.split(",");

  //yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.userId });

  //celient a cevap gönder
  res.status(201).json({ message: "hizmet başarıyla oluşturuldu", gig: savedGig });
});

export const deleteGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.status(200).json({ message: "işlem başarılı" });
});
