"use client";

import React from "react";
import { Play } from "lucide-react";

interface LessonVideoPlayerProps {
  rootId?: string;
  lessonTitle: string;
  updatedDate: string;
  onAddNote: () => void;
  addNoteButtonId?: string;
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  rootId,
  lessonTitle,
  updatedDate,
  onAddNote,
  addNoteButtonId,
}) => {
  return (
    <div id={rootId} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex">
      {/* Left side: video thumbnail or video */}
      <div className="flex-1 relative">
        <img
          src="/images/20250630150800-ugrw2nuezq.png"
          alt={lessonTitle}
          className="w-full h-full object-cover"
        />
        {/* Play icon positioned as in the image */}
        <div className="absolute top-1/2 left-[calc(100%+12px)] -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 shadow-lg cursor-pointer">
          <Play size={20} className="text-white" />
        </div>
      </div>

      {/* Right side: white background with text */}
      <div className="hidden md:flex flex-col justify-center bg-white px-6 py-4 w-[320px]">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">HTML, CSS</h2>
        <div className="text-lg font-semibold mb-1">
          <span className="bg-blue-500 text-white px-2 rounded">từ zero đến</span>
        </div>
        <div className="text-xl font-mono text-blue-600 mb-4">&lt;hero&gt;</div>
        <div className="text-orange-500 font-semibold text-sm tracking-wide">Fullstack.edu.vn</div>
      </div>
    </div>
  );
};

export default LessonVideoPlayer;