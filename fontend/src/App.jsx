// src/App.jsx
import React , { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Snowfall from "react-snowfall";
import Login from "./components/Login";
import Game from "./pages/GamePage";
import Donate from "./pages/Donate";


export default function App() {
  const [showSnow, setShowSnow] = useState(true);
  return (
    <Router>

      <div className="flex flex-col min-h-screen">
        <Navbar showSnow={showSnow} setShowSnow={setShowSnow} />
        {showSnow && <Snowfall />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
        
        <Footer />
      </div>

    </Router>
  );
}
