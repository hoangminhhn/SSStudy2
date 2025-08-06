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
    <div
      id={rootId}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex justify-center items-center"
    >
      {/* Black side bars */}
      <div className="absolute inset-y-0 left-0 w-20 bg-black z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-black z-10" />

      {/* Center content: left blue image, right white info panel */}
      <div className="relative flex max-w-full max-h-full rounded-lg overflow-hidden">
        {/* Left side: image */}
        <div className="bg-blue-600 flex items-center justify-center px-8 py-6">
          <img
            src="/images/20250630150800-ugrw2nuezq.png"
            alt={lessonTitle}
            className="max-h-[calc(100vh-200px)] object-contain rounded-lg"
          />
        </div>

        {/* Right side: white background with text and play button */}
        <div className="bg-white flex flex-col justify-center px-10 py-8 w-[360px] relative">
          <h2 className="text-3xl font-bold text-blue-600 mb-3">HTML, CSS</h2>
          <div className="text-lg font-semibold mb-2">
            <span className="bg-blue-500 text-white px-3 rounded">từ zero đến</span>
          </div>
          <div className="text-2xl font-mono text-blue-600 mb-6">&lt;hero&gt;</div>
          <div className="text-orange-500 font-semibold text-sm tracking-wide mb-6">Fullstack.edu.vn</div>

          {/* Play button */}
          <button
            aria-label="Play video"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
          >
            <Play size={24} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonVideoPlayer;