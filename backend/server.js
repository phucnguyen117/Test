// server/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import connectDB from './config/db.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ket no mongodb
await connectDB();

// --- Routes ---
app.get('/', (req, res) => res.send("API Working"))

// API lưu user
app.post("/api/users", async (req, res) => {
  try {
    const { id, name, email, avatar, role } = req.body;

    let user = await User.findOne({ id });
    if (user) {
      // update
      user.name = name;
      user.email = email;
      user.avatar = avatar;
      user.role = role || user.role; // giữ nguyên nếu ko có
      await user.save();
    } else {
      // tạo mới
      user = new User({ id, name, email, avatar, role });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Lỗi server" });
  }
});


// Lấy thông tin user theo UID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ success: false, message: "User không tồn tại" });
    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Lỗi server" });
  }
});


// Cập nhật điểm khi người chơi thắng
app.post("/api/update-score", async (req, res) => {
  try {
    const { id, score } = req.body; // id là UID từ Firebase

    const user = await User.findOneAndUpdate(
      { id },
      { $inc: { score: score } }, // ✅ cộng dồn điểm
      { new: true }
    );

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Lỗi server" });
  }
});


// API lấy top 10 user có điểm cao nhất
app.get("/api/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ score: -1 }) // sắp xếp giảm dần
      .limit(5)           // top 5
      .select("name score");

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

//Port 
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server đang chạy ở cổng ${PORT}`);
})
