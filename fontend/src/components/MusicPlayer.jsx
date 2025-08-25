import React, { useState, useRef } from "react";
import { FiMusic } from "react-icons/fi";
import { MdMusicOff, MdMusicNote } from "react-icons/md";
import { LuAudioLines } from "react-icons/lu";
import song1 from "../assets/nhac1.m4a";
import song2 from "../assets/nhac2.m4a";

const tracks = [
  { id: 1, title: "Phép Màu", src: song1 },
  { id: 2, title: "Thằng Điên", src: song2 },
];

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

  const handlePlay = (track) => {
    if (!track.src) return; // nếu chưa có src thì không làm gì

    if (currentTrack?.id === track.id) {
      // pause bài đang phát
      audioRef.current.pause();
      setCurrentTrack(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      setCurrentTrack(track);
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* List bài hát */}
      {open && (
        <div className="mb-2 w-48 bg-white/40 backdrop-blur-md rounded-xl shadow-lg p-3 flex flex-col gap-2">
          {tracks.map((track) => (
            <button
              key={track.id}
              className={`text-left px-2 py-1 rounded-lg hover:bg-indigo-100 transition
                ${currentTrack?.id === track.id ? "bg-indigo-200 font-semibold" : ""}`}
              onClick={() => handlePlay(track)}
            >
              <div className="flex items-center justify-between">
                <span>{track.title}</span>
                {currentTrack?.id === track.id && <LuAudioLines />}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Icon nhạc */}
      <button
        className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-full border border-white/30 text-white shadow-md hover:bg-white/30 transition"
        onClick={() => setOpen(!open)}
      >
        {currentTrack ? <MdMusicNote size={20} /> : <MdMusicOff size={20} />}
      </button>

      {/* Audio element */}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onEnded={() => setCurrentTrack(null)}
        />
      )}
    </div>
  );
}
