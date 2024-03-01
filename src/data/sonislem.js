import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    islem: {
      type: String,
      trim: true,
    },
  },
  { collection: "islem", timestamps: true }
);

const Islem = mongoose.model("islem", BakiyeSchema);

export default Islem;
