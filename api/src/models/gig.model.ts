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
const gigSchema = new Schema<IGig>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
