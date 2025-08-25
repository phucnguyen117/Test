import { useState } from "react";

export default function Support() {
    const [loading, setLoading] = useState(true);

    // Thông tin ngân hàng
    const bankInfo = {
        accountName: "HOANG HUU PHUC NGUYEN",
        accountNumber: "071120057575",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-400 to-blue-300 flex flex-col items-center justify-start pt-30 p-4">

            <div className="bg-indigo-100 rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4 max-w-sm w-full backdrop-blur-md">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Ủng Hộ Tôi 🎁
                </h1>

                <p className="text-gray-600 text-center text-sm">
                    Nếu bạn muốn giúp tôi, hãy quét QR để chuyển khoản ủng hộ nhé.
                </p>

                {/* QR Code */}
                {loading && <p className="text-gray-600 text-lg">Đang tải QR...</p>}
                <img
                    src='https://img.vietqr.io/image/MB-071120057575-compact.png?addInfo=Ung%20ho%20website'
                    alt="QR ủng hộ"
                    className="w-64 h-64 rounded-xl object-cover"
                    onLoad={() => setLoading(false)}
                />

                {/* Thông tin ngân hàng */}
                <div className="text-gray-700 text-sm text-center flex flex-col gap-1">
                    <p>Chủ tài khoản: {bankInfo.accountName}</p>
                    <p>Số tài khoản: {bankInfo.accountNumber}</p>
                </div>
            </div>
        </div>
    );
}
