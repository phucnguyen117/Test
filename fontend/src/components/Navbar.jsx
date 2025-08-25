// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({ showSnow, setShowSnow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 
      z-50 backdrop-blur-md bg-white/10 border border-white/20 
      shadow-lg rounded-4xl px-6 py-4 w-[90%] max-w-4xl"
    >
      <div className="flex justify-between items-center">
        {/* User bên trái */}
        <Link to="/login">
          {user ? (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full border border-white/30 shadow-md hover:opacity-80 transition"
            />
          ) : (
            <div
              className="w-10 h-10 flex items-center justify-center 
                       rounded-full bg-white/20 border border-white/30 
                       text-white shadow-md hover:bg-white/30 transition"
            >
              <FiUser size={20} />
            </div>
          )}
        </Link>

        {/* Logo ở giữa */}
        <h1 className="text-xl font-bold text-white"><Link to="/">PhucNguyen</Link></h1>

        {/* FiMenu bên phải */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center 
                     rounded-full bg-white/20 border border-white/30 
                     text-white shadow-md hover:bg-white/30 transition"
        >
          {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Menu trong FiMenu */}
      <div
        className={`overflow-hidden transition-all duration-800 ease-in-out transform origin-top ${isOpen
          ? 'max-h-60 opacity-100 scale-y-100'
          : 'max-h-0 opacity-0 scale-y-95'
          }`}
      >
        <ul className="flex flex-col mt-4 space-y-3 text-white items-center">
          <li><Link to="/" className="hover:text-gray-700">Trang Chủ</Link></li>
          <li><Link to="/about" className="hover:text-gray-700">Giới Thiệu</Link></li>
          <li><Link to="/donate" className="hover:text-gray-700">Ủng Hộ</Link></li>
          <li><Link to="/game" className="hover:text-gray-700">Trò Chơi</Link></li>
          <li className="flex items-center gap-3">
            <span className="text-sm ">❄️Tuyết</span>
            {/* iPhone style toggle */}
            <button
              onClick={() => setShowSnow(!showSnow)}
              className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${showSnow ? 'bg-blue-600' : 'bg-gray-400'
                }`}
            >
              <div
                className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${showSnow ? 'translate-x-4' : 'translate-x-0'
                  }`}
              ></div>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
