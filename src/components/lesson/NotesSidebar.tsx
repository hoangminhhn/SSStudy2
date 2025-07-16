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

// Dummy data for notes
const dummyNotes: Note[] = [
  {
    id: "note-1",
    timestamp: "00:40",
    title: "Làm quen với Dev tools",
    content: "Đây là ghi chú đầu tiên của tôi về cách sử dụng Dev tools để kiểm tra các phần tử trên trang web.",
  },
  {
    id: "note-2",
    timestamp: "01:25",
    title: "Cấu trúc HTML cơ bản",
    content: "Ghi chú về các thẻ HTML quan trọng như <div>, <p>, <h1> và cách chúng được sử dụng để xây dựng bố cục.",
  },
  {
    id: "note-3",
    timestamp: "03:10",
    title: "CSS Flexbox",
    content: "Tìm hiểu về Flexbox để căn chỉnh các phần tử một cách linh hoạt. Các thuộc tính như display: flex, justify-content, align-items rất hữu ích.",
  },
  {
    id: "note-4",
    timestamp: "05:00",
    title: "JavaScript DOM Manipulation",
    content: "Cách tương tác với DOM bằng JavaScript để thay đổi nội dung, kiểu dáng và cấu trúc của trang web.",
  },
  {
    id: "note-5",
    timestamp: "07:30",
    title: "React Components",
    content: "Ghi chú về cách tạo và sử dụng các React component, props và state để xây dựng giao diện người dùng động.",
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