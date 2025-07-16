"use client";

import React from "react";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import Button
import AddNoteDialog from "./AddNoteDialog"; // Import the new dialog component

interface LessonVideoPlayerProps {
  lessonTitle: string;
  videoUrl?: string; // Optional video URL
  thumbnailUrl?: string; // Optional thumbnail URL
  updatedDate: string; // Added updatedDate prop
  onAddNote?: (noteContent: string) => void; // Modified onAddNote prop to accept content
  rootId?: string; // New prop for the root div's ID
  addNoteButtonId?: string; // New prop for the add note button's ID
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({
  lessonTitle,
  videoUrl,
  thumbnailUrl = "https://via.placeholder.com/1280x720?text=Video+Placeholder",
  updatedDate,
  onAddNote,
  rootId,
  addNoteButtonId,
}) => {
  // Placeholder for current video time. In a real app, this would come from video player state.
  const currentVideoTime = "00:00";

  const handleSaveNote = (content: string) => {
    if (onAddNote) {
      onAddNote(content);
      console.log(`Note saved at ${currentVideoTime}: ${content}`);
      // Here you would typically send the note to a backend or store it locally
    }
  };

  const handleCancelNote = () => {
    console.log("Note creation cancelled.");
  };

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
        {onAddNote && (
          <AddNoteDialog
            timestamp={currentVideoTime}
            onSave={handleSaveNote}
            onCancel={handleCancelNote}
          >
            <Button
              id={addNoteButtonId}
              variant="outline"
              className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-4 py-2"
            >
              <Plus size={16} className="mr-2" />
              Thêm ghi chú tại {currentVideoTime}
            </Button>
          </AddNoteDialog>
        )}
      </div>
    </div>
  );
};

export default LessonVideoPlayer;