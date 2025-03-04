import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
