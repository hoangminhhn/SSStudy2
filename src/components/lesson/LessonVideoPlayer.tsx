"use client";

import React from "react";
import { Play } from "lucide-react";

interface LessonVideoPlayerProps {
  lessonTitle: string;
  videoUrl?: string; // Optional video URL
  thumbnailUrl?: string; // Optional thumbnail URL
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  lessonTitle,
  videoUrl,
  thumbnailUrl = "https://via.placeholder.com/1280x720?text=Video+Placeholder",
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
        {videoUrl ? (
          <video controls src={videoUrl} className="w-full h-full object-cover">
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={64} className="text-white opacity-75" />
            </div>
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
        {lessonTitle}
      </h1>
    </div>
  );
};

export default LessonVideoPlayer;