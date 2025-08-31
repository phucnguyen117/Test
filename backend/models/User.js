import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UID từ Firebase
  name: String,
  email: { type: String, required: true },
  avatar: String,
  role: { type: String, default: "user" }, // mặc định "user"
  score: { type: Number, default: 0 },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
