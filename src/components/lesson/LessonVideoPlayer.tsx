"use client";

import React from "react";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button

interface LessonVideoPlayerProps {
  lessonTitle: string;
  videoUrl?: string; // Optional video URL
  thumbnailUrl?: string; // Optional thumbnail URL
  updatedDate: string; // Added updatedDate prop
  onAddNote?: () => void; // Added onAddNote prop
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  lessonTitle,
  videoUrl,
  thumbnailUrl = "https://via.placeholder.com/1280x720?text=Video+Placeholder",
  updatedDate,
  onAddNote,
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
      <div className="flex justify-between items-center mt-0 mb-2"> {/* Changed mt-4 to mt-0 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{lessonTitle}</h1>
          <p className="text-sm text-gray-500">Cập nhật {updatedDate}</p>
        </div>
        {onAddNote && (
          <Button
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-4 py-2"
            onClick={onAddNote}
          >
            <Plus size={16} className="mr-2" />
            Thêm ghi chú tại 00:00
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonVideoPlayer;