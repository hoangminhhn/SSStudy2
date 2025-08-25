"use client";

import React from "react";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button

interface LessonVideoPlayerProps {
  lessonTitle: string;
  videoUrl?: string; // Optional video URL
  thumbnailUrl?: string; // Optional thumbnail URL
  updatedDate: string; // Added updatedDate prop
  onAddNote?: () => void; // Changed to simple callback without popup
  rootId?: string; // New prop for the root div's ID
  addNoteButtonId?: string; // New prop for the add note button's ID
  showAddNoteButton?: boolean; // New prop to control whether the internal add-note button is shown
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  lessonTitle,
  videoUrl,
  thumbnailUrl = "/images/20250630150800-ugrw2nuezq.png", // Updated default thumbnail URL
  updatedDate,
  onAddNote,
  rootId,
  addNoteButtonId,
  showAddNoteButton = true,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div
        id={rootId}
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center"
      >
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
      <div className="flex justify-between items-center mt-0 pr-32">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-0">{lessonTitle}</h1>
          <p className="text-sm text-gray-500 mb-0">Cập nhật {updatedDate}</p>
        </div>
        {onAddNote && showAddNoteButton && (
          <Button
            id={addNoteButtonId}
            variant="outline"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-4 py-2"
            onClick={onAddNote} // Directly call onAddNote without popup
          >
            <Plus size={16} className="mr-2" />
            Thêm ghi chú
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonVideoPlayer;