import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import { NextFunction } from "express";

// Configuration
cloudinary.config({
  cloud_name: "djfgtk1ck",
  api_key: "238236392131488",
  api_secret: "BuFjZrg5dc0nIfeKM3Y3FGohJyw", // Click 'View API Keys' above to copy your API secret
});

export const upload = async (
  file_path: string,
  next: NextFunction,
  folder: string = "avatars",
  type: "image" | "video" | "auto" | "raw" | undefined = "image"
) => {
  return await cloudinary.uploader.upload(
    file_path,
    {
      folder,
      resource_type: type,
    },
    (err, result) => {
      if (err) return next(error(400, "Fotoğraf yüklenirken sorun oluştu"));

      return result?.secure_url;
    }
  );
};

export default cloudinary;
