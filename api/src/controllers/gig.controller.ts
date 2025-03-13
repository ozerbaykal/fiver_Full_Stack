import { NextFunction, Response, Request } from "express";
import c from "../utils/catchAsync.ts";
import Gig from "../models/gig.model.ts";
import { upload } from "../utils/cloudinary.ts";
import { ExtendedFiles, Filter, Query } from "../types/index.ts";
import error from "../utils/error.ts";

const buildFiltes = (query: Query) => {
  let filters: Filter = {};

  if (query.userID) filters.user = query.userID;

  if (query.category) filters.category = query.category;

  if (query.min || query.max) {
    filters.package_price = {};
    if (query.min) filters.package_price.$gte = query.min;
    if (query.max) filters.package_price.$lte = query.max;
  }

  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

export const getAllGigs = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filters = buildFiltes(req.query);

  const gigs = await Gig.find(filters).populate("user", "username photo");

  if (gigs.length === 0) return next(error(404, "Hiç bir hizmet bulunamadı"));
  res.status(200).json({ message: "işlem başarılı", results: gigs.length, gigs });
});

export const getGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const gig = await Gig.findById(req.params.id).populate("user", "-password");
  res.status(200).json({ message: "Hizmet Verisi alındı, ", gig });
});

export const createGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //isteği atan kullanıcının hesabı satıcı hesabı değilse hata döndür
  if (!req.isSeller) return next(error(403, "Sadece seller hesabı hizmet oluşturabilir"));

  // kapak fotoğragının url'si ve diğer fotoğrafların url'lerini al cloudinary e yükle
  const files = req.files as unknown as ExtendedFiles;

  const coverImage = await upload(files.coverImage[0].path, next, "gig-images");

  //diğer fotoğraflari için promise oluştur
  const promises = files.images.map((image) => upload(image.path, next, "gig-images"));

  //bütün resimleri tek seferde yükleyip sonuçları al
  const images = await Promise.all(promises);

  //resimleri ve kapak resmin url'lerini req.body' ekle
  req.body.coverImage = coverImage.secure_url;
  req.body.images = images.map((image) => image.secure_url);

  //paket özelliklerini virgülle ayrılmış listeye çevir
  req.body.package_features = req.body.package_features?.split(",");

  //yeni hizmet belgesi oluştur
  const savedGig = await Gig.create({ ...req.body, user: req.userId });

  //celient a cevap gönder
  res.status(201).json({ message: "hizmet başarıyla oluşturuldu", gig: savedGig });
});

export const deleteGig = c(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // hizmet detaylarını al
  const gig = await Gig.findById(req.params.id);

  // işlemi yapan kişi hizmet sahibi değilse hata döndür
  if (gig?.user !== req.userId) return next(error(404, "Bu işlemi yapmaya yetkiniz yok"));

  //hizmeti sil
  await Gig.findByIdAndDelete(req.params.id);

  //client e cevap gönder
  res.status(200).json({ message: "Hizmet başarılı bir şekilde kaldırıldı" });
});
