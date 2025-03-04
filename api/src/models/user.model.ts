import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  photo: string;
  country: string;
  isSeller: boolean;
  phone?: string;
  desc?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Lütfen Username alanını belirleyin"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Lütfen mail alanını belirleyin"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Lütfen password alanını belirleyin"],
    },
    photo: {
      type: String,
      default: "https://picsum.photos/200",
    },
    country: {
      type: String,
      required: [true, "Lütfen Country alanını belirleyin"],
    },

    isSeller: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);

export default User;
