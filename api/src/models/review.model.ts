import { Schema, model } from "mongoose";

export interface IReview {
  name: string;
}

const reviewSchema = new Schema<IReview>({
  name: {
    type: String,
  },
});

const Review = model<IReview>("Review", reviewSchema);
export default Review;
