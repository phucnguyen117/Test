import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

export default function GuessNumberGame() {
    const [secret, setSecret] = useState([]);
    const [guess, setGuess] = useState(["", "", "", "", ""]);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(100);
    const [results, setResults] = useState([null, null, null, null, null]); // true=đúng, false=sai
    const [showGuide, setShowGuide] = useState(false); // hiện card hướng dẫn
    const [user, setUser] = useState(null); // ✅ thêm state user
    const [leaderboard, setLeaderboard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const API_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 🔥 Lấy điểm user từ MongoDB khi login
    useEffect(() => {
        if (!user) return;

        fetch(`${API_URL}/api/user/${user.uid}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUserScore(data.user.score); // lưu vào state
                }
            })
            .catch(err => console.error(err));
    }, [user]);


    // 🔥 fetch leaderboard khi load trang
    useEffect(() => {
        fetch(`${API_URL}/api/leaderboard`)
            .then((res) => res.json())
            .then((data) => setLeaderboard(data))
            .catch((err) => console.error(err));
    }, []);

    // 🔥 cập nhật điểm khi thắng
    const updateScore = async (newScore) => {
        if (!user) return;
        await fetch(`${API_URL}/api/update-score`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.uid, score: newScore }),
        });
        // load lại leaderboard
        const res = await fetch(`${API_URL}/api/leaderboard`);
        setLeaderboard(await res.json());
    };


    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        // Sinh ngẫu nhiên 5 số từ 0 đến 9
        let nums = [];
        while (nums.length < 5) {
            let n = Math.floor(Math.random() * 10); // 0 - 9
            if (!nums.includes(n)) nums.push(n);
        }
        setSecret(nums);
        setGuess(["", "", "", "", ""]);
        setMessage("Hãy nhập dự đoán của bạn!");
        setScore(100);
        setResults([null, null, null, null, null]);
        setGameOver(false);
    };

    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            // cho nhập số 0 - 9
            const newGuess = [...guess];
            newGuess[index] = value;
            setGuess(newGuess);
        }
    };

    const checkGuess = () => {
        if (guess.includes("") || guess.length !== 5) {
            setMessage(<p style={{ color: "red" }}>Vui lòng nhập đủ 5 số!</p>);
            return;
        }

        let correct = 0;
        let newResults = [];

        guess.forEach((g, i) => {
            if (parseInt(g) === secret[i]) {
                correct++;
                newResults[i] = true;
            } else {
                newResults[i] = false;
            }
        });

        setResults(newResults);

        let newScore = score - 5;
        let resultMsg = `Bạn đoán đúng ${correct}/5 ô.`;

        if (correct === 5) {
            resultMsg = `🎉 Chính xác! Bạn thắng với số điểm: ${score}`;
            setMessage(resultMsg);
            // ✅ Lưu điểm vào MongoDB
            updateScore(score);
            setGameOver(true);
            setTimeout(() => resetGame(), 9000);
            return;
        }


        if (newScore <= 0) {
            setMessage(`😢 Bạn đã thua! Bị trừ 5 điểm. Số đúng là: ${secret.join(" ")}`);
            setGameOver(true);
            updateScore(-5);
            setTimeout(() => resetGame(), 9000);
            return;
        }

        setScore(newScore);
        setMessage(resultMsg);
    };

    // Nếu chưa đăng nhập thì hiển thị màn hình login
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300">
                <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
                    🔒 Vui lòng đăng nhập để chơi game
                </h1>
                <Link
                    to="/login"
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-2xl shadow-lg backdrop-blur-md transition text-lg font-medium"
                >
                    Đăng nhập
                </Link>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300 p-6">
            {/* Game chính */}
            <div className="bg-white/80 rounded-2xl shadow-xl p-6 max-w-lg w-full mb-6 mt-30 relative">
                <h1 className="text-2xl font-bold text-center mb-4 text-purple-700">
                    🎮 Trò chơi đoán số trong ô
                </h1>

                <div className="grid grid-cols-5 gap-2 mb-4">
                    {guess.map((val, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength="1"
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                            className={`w-14 h-14 text-center text-xl font-bold rounded-lg border-4 focus:outline-none 
                ${results[i] === true
                                    ? "border-green-500"
                                    : results[i] === false
                                        ? "border-red-500"
                                        : "border-purple-400"
                                }`}
                        />
                    ))}
                </div>

                {!gameOver && (
                    <button
                        onClick={checkGuess}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Gửi dự đoán
                    </button>
                )}

                <p className="text-center mt-3 font-medium text-gray-700">{message}</p>
                <p className="text-center mt-1 text-lg font-semibold text-indigo-600">
                    Điểm: {score}
                </p>

                <button
                    onClick={resetGame}
                    className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 rounded-lg"
                >
                    Chơi lại
                </button>

                {/* Nút Hướng dẫn */}
                <button
                    onClick={() => setShowGuide(true)}
                    className="mt-2 w-full bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 rounded-lg"
                >
                    📘 Hướng dẫn
                </button>

                {/* Card hướng dẫn */}
                {showGuide && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-80 bg-white rounded-xl shadow-2xl p-4 border border-indigo-300 z-20">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-indigo-600">📘 Cách chơi</h3>
                            <button
                                onClick={() => setShowGuide(false)}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                ❌
                            </button>
                        </div>
                        <p className="text-gray-700 text-sm">
                            - Máy sẽ chọn ngẫu nhiên 5 số khác nhau từ 0 đến 9. <br />
                            - Bạn nhập 5 số để đoán. <br />
                            - Mỗi lần đoán sai mất 5 điểm. <br />
                            - Ô đoán đúng hiển thị viền xanh, sai viền đỏ. <br />
                            - Nếu điểm về 0 thì bạn thua và phải chơi lại. <br />
                            <br />
                            <hr />
                            <br />
                            - Khi đoán đúng toàn bộ, bạn thắng với số điểm hiện tại vào điểm gốc. <br />
                            - Khi đoán sai toàn bộ, bạn sẽ bị trừ 5 điểm gốc. <br />
                        </p>
                    </div>
                )}
            </div>

            {/* Bảng xếp hạng */}
            <div className="bg-white/90 rounded-2xl shadow-xl p-6 max-w-lg w-full mb-10">
                <h2 className="text-xl font-bold text-center mb-4 text-indigo-700">
                    🏆 Bảng Xếp Hạng 🏆
                </h2>
                <p className="text-lg font-bold mt-2 pb-2">Điểm của bạn: {userScore}</p>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-indigo-100 text-indigo-800">
                            <th className="p-2 border">Top</th>
                            <th className="p-2 border">Tên người chơi</th>
                            <th className="p-2 border">Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, idx) => (
                            <tr key={idx} className="text-center hover:bg-indigo-50">
                                <td className="p-2 border font-bold text-indigo-700">
                                    #{idx + 1}
                                </td>
                                <td className="p-2 border font-medium">{player.name}</td>
                                <td className="p-2 border text-indigo-600 font-bold">
                                    {player.score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
