import { Schema, model } from "mongoose";

export interface IGig {
  name: string;
}

const gigSchema = new Schema<IGig>({
  name: {
    type: String,
  },
});

const Gig = model<IGig>("Gig", gigSchema);

export default Gig;
