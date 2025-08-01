"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Note {
  id: string;
  timestamp: string;
  title: string;
  content: string;
}

interface NotesSidebarInlineProps {
  notes?: Note[];
  onClose: () => void;
}

const dummyNotes: Note[] = [
  {
    id: "note-1",
    timestamp: "00:40",
    title: "Tổng ôn lượng giác (phần 1)",
    content: "Ghi chú về các công thức lượng giác cơ bản và cách áp dụng chúng trong giải phương trình.",
  },
  {
    id: "note-2",
    timestamp: "01:25",
    title: "Hàm số mũ loga",
    content: "Các tính chất quan trọng của hàm số mũ và logarit, bao gồm đạo hàm và đồ thị.",
  },
  {
    id: "note-3",
    timestamp: "03:10",
    title: "Nguyên hàm cơ bản",
    content: "Tổng hợp các nguyên hàm cơ bản và phương pháp tính nguyên hàm bằng phương pháp đổi biến.",
  },
  {
    id: "note-4",
    timestamp: "05:00",
    title: "Hệ tọa độ Oxyz",
    content: "Ghi chú về các khái niệm cơ bản trong không gian Oxyz: điểm, vector, phương trình mặt phẳng.",
  },
  {
    id: "note-5",
    timestamp: "07:30",
    title: "Bài toán tăng trưởng, lãi suất",
    content: "Công thức tính lãi kép và các bài toán ứng dụng thực tế liên quan đến tăng trưởng dân số, lãi suất ngân hàng.",
  },
  {
    id: "note-6",
    timestamp: "09:15",
    title: "Giới hạn hàm số",
    content: "Các quy tắc tính giới hạn và các dạng vô định thường gặp trong bài tập.",
  },
];

const NotesSidebarInline: React.FC<NotesSidebarInlineProps> = ({ notes = dummyNotes, onClose }) => {
  return (
    <div className="flex flex-col w-full max-w-md bg-white border-l border-gray-200 p-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
          <span>Ghi chú của tôi</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle size={20} className="text-gray-500 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Click vào ghi chú thì video sẽ nhảy đến thời điểm đánh dấu ghi chú</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Đóng ghi chú">
          ✕
        </Button>
      </div>

      <div className="flex items-center space-x-2 py-4">
        <Select defaultValue="current-chapter" className="flex-1">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trong chương hiện tại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current-chapter">Trong chương hiện tại</SelectItem>
            <SelectItem value="all-chapters">Tất cả các chương</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest" className="flex-1">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mới nhất" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="oldest">Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-semibold">{note.timestamp}</span>
                <span className="text-gray-800 font-medium">{note.title}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{note.content}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-8">Chưa có ghi chú nào.</p>
      )}
    </div>
  );
};

export default NotesSidebarInline;