import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    guncelrp: {
      type: Number,
      trim: true,
    },
    sonrpoda: {
      type: String,
      trim: true,
      default: null,
    },
    sonrpzaman: {
      type: Number,
      trim: true,
      default: null,
    },
  },
  { collection: "GuncelRP", timestamps: true }
);

const GuncelRP = mongoose.model("GuncelRP", BakiyeSchema);

export default GuncelRP;
