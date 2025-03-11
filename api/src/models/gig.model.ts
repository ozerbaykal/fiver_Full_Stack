import { Schema, Types, model } from "mongoose";

//bir belgenin tipi
export interface IGig {
  _id: string;
  user: Types.ObjectId;
  title: string;
  description: string;
  reviewCount: string;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  package_title: string;
  package_description: string;
  package_price: number;
  package_features: string[];
  package_duration: number;
  package_revisions: number;
  createdAt: string | null;
  updatedAt: string;
}

//şema oluştur
const gigSchema = new Schema<IGig>(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: [true, "Lütfen title alanını belirleyin"],
    },
    description: {
      type: String,
      required: [true, "Lütfen description alanını belirleyin"],
      minlength: [25, "description alanını en az 15 karakter olmalı"],
      maxlength: [200, "description alanını en falza 200 karakter olmalı"],
    },

    reviewCount: {
      type: String,
      default: "0",
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Lütfen kategoriyi belirleyin"],
    },
    coverImage: {
      type: String,
      required: [true, "Lütfen kapak resmini belirleyin"],
    },
    images: {
      type: [String],
      required: [true, "Lütfen en az 1 resmi belirleyin"],
    },
    package_title: {
      type: String,
      required: [true, "Lütfen paket başlığı alanını belirleyin"],
    },
    package_description: {
      type: String,
      required: [true, "Lütfen paket açıklaması alanını belirleyin"],
    },

    package_price: {
      type: Number,
      required: [true, "Lütfen paket fiyatı alanını belirleyin"],
    },
    package_features: {
      type: [String],
      required: [true, "Lütfen paket özelliklerini belirtin"],
    },

    package_duration: {
      type: Number,
      required: [true, "Lütfen paket süresini belirtin"],
    },
    package_revisions: {
      type: Number,
      required: [true, "Lütfen paket değişikliklerini belirtin"],
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
