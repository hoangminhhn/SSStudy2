"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Note {
  id: string;
  timestamp: string;
  title: string;
  content: string;
}

interface NotesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  notes?: Note[]; // Optional prop for notes data
}

// Dummy data for notes, updated to be relevant to course content
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

const NotesSidebar: React.FC<NotesSidebarProps> = ({ isOpen, onClose, notes = dummyNotes }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold text-gray-800">Ghi chú của tôi</SheetTitle>
        </SheetHeader>

        <div className="flex items-center space-x-2 py-4">
          <Select defaultValue="current-chapter">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Trong chương hiện tại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-chapter">Trong chương hiện tại</SelectItem>
              <SelectItem value="all-chapters">Tất cả các chương</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Mới nhất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
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
      </SheetContent>
    </Sheet>
  );
};

export default NotesSidebar;