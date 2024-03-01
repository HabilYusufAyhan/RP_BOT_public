import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
  },
  { collection: "RPOda", timestamps: true }
);

const RPOda = mongoose.model("RPOda", BakiyeSchema);

export default RPOda;
