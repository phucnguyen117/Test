// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);

  // Theo dõi trạng thái đăng nhập (vẫn giữ khi chuyển trang)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        const userData = {
          id: u.uid,
          name: u.displayName,
          email: u.email,
          avatar: u.photoURL,
          role: "user", // mặc định khi tạo mới
        };

        try {
          await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
        } catch (err) {
          console.error("Lỗi gửi dữ liệu user:", err);
        }
      }
    });
    return () => unsub();
  }, []);

  // Google login
  const handleGoogleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

  // Logout
  const handleLogout = () => signOut(auth);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-400 to-pink-400">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 text-center">
        {user ? (
          <div>
            <img
              src={user.photoURL || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto shadow-md"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {user.displayName || "Người dùng"}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md transition"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Đăng nhập
            </h2>

            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:shadow-lg py-2 rounded-xl transition"
            >
              <FcGoogle size={24} />
              <span className="text-gray-700 font-medium">
                Đăng nhập với Google
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
