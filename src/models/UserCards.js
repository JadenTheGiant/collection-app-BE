import mongoose from "mongoose";

const userCardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collected: { type: Boolean, default: false },
});

export default mongoose.model("UserCard", userCardSchema);
