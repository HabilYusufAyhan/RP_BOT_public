import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    sure: {
      type: Number,
      trim: true,
    },
    uyari: {
      type: Number,
      trim: true,
    },
  },
  { collection: "uyari" }
);

const uyari = mongoose.model("uyari", BakiyeSchema);

export default uyari;
