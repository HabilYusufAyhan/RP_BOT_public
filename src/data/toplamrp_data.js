import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    toplamrp: {
      type: Number,
      trim: true,
    },
  },
  { collection: "ToplamRP", timestamps: true }
);

const ToplamRP = mongoose.model("ToplamRP", BakiyeSchema);

export default ToplamRP;
