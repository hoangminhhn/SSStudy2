"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface LessonDetailsProps {
  lessonTitle: string;
  updatedDate: string;
  onAddNote?: () => void;
}

const LessonDetails: React.FC<LessonDetailsProps> = ({
  lessonTitle,
  updatedDate,
  onAddNote,
}) => {
  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{lessonTitle}</h2>
          <p className="text-sm text-gray-500">Cập nhật {updatedDate}</p>
        </div>
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-4 py-2"
          onClick={onAddNote}
        >
          <Plus size={16} className="mr-2" />
          Thêm ghi chú tại 00:00
        </Button>
      </div>
    </div>
  );
};

export default LessonDetails;