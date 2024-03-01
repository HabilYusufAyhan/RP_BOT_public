import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    bakiye: {
      type: Number,
      trim: true,
    },
  },
  { collection: "bakiye", timestamps: true }
);

const Bakiye = mongoose.model("Bakiye", BakiyeSchema);

export default Bakiye;
