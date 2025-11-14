




import mongoose from "mongoose";

const userCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  collected: { type: Boolean, default: false },
});

export default mongoose.model("UserCard", userCardSchema);
