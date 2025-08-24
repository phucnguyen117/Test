// src/pages/About.jsx
import { useEffect, useState } from "react";

export default function About() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hue,vn&appid=fda1d1a0868ea15a11e8ae100805895c&units=metric&lang=vi`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Lỗi lấy thời tiết:", error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-300 p-6 pt-25">
      <div className="bg-gray-100 rounded-2xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Ảnh đại diện */}
        <div className="md:w-1/2 flex items-center justify-center bg-indigo-100 p-6">
          <img
            src="https://i.pinimg.com/736x/15/e5/da/15e5da640fe35d6122350347f146d588.jpg"
            alt="Ảnh đại diện"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* Thông tin */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Giới thiệu Website
            </h2>
            <p className="text-gray-700"><span className="font-semibold">Tên Website:</span> PhucNguyen</p>
            <p className="text-gray-700"><span className="font-semibold">Năm Được Tạo:</span> 08/2025</p>
            <p className="text-gray-700"><span className="font-semibold">Người Tạo:</span> Phúc Nguyên</p>
          </div>

          {/* Thời tiết */}
          <div className="mt-6 bg-indigo-100 p-4 rounded-xl shadow-inner flex flex-col items-center">
            {weather ? (
              <>
                <h3 className="text-lg font-semibold text-indigo-600">
                  🌤 Thời tiết hiện tại của {weather.name}
                </h3>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-indigo-700 mt-2">
                    {Math.round(weather.main.temp)}°C
                  </p>
                  <p>💧 Độ ẩm: <span className="font-semibold">{weather.main.humidity}%</span></p>
                  <p>💨 Gió: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Đang tải thời tiết...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
