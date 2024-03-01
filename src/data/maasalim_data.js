import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BakiyeSchema = new Schema(
  {
    id: {
      type: String,
      trim: true,
    },
  },
  { collection: "maasalim" }
);

const maasalim = mongoose.model("maasalim", BakiyeSchema);

export default maasalim;
