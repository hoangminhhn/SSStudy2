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

      {/* Center content: image with play button overlay */}
      <div className="relative max-w-full max-h-full flex justify-center items-center">
        <img
          src="/images/20250630150800-ugrw2nuezq.png"
          alt={lessonTitle}
          className="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-lg"
        />
        <div className="absolute top-1/2 left-[calc(50%-120px)] -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 shadow-lg cursor-pointer">
          <Play size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default LessonVideoPlayer;