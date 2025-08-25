import React from "react";

export default function Home() {
  const fileName = "Minecraft_PE_1.21.100.apk";
  const fileUrl = "https://drive.google.com/uc?export=download&id=1iDhpuN_ZVw9XelXPa_dk7Jv4schp0uM7";

  const handleDownload = (e) => {
    e.preventDefault(); // Ngăn link tải xuống mặc định
    const confirmed = window.confirm("Bạn muốn tải chứ?");
    if (confirmed) {
      // Tạo link tạm để tải file
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex flex-col items-center justify-center">

      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Chào bạn, Đây là Minecraft PE 1.21.100 - 🎉
        </h1>

        {/* Nút tải ứng dụng */}
        <button
          onClick={handleDownload}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl shadow-lg backdrop-blur-md transition text-lg font-medium"
        >
          📥 Tải Minecraft PE xuống
        </button>

        {/* Dòng mô tả tên file */}
        <p className="text-sm text-white/80 mt-2 pt-4">
          Tệp: {fileName}
        </p>
      </div>

    </div>
  );
}
