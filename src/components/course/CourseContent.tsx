"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Session {
  title: string;
  date: string;
}

interface Chapter {
  id: string;
  progress: string;
  title: string;
  sessions: Session[];
}

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    progress: "0/8",
    title: "Tổng ôn kiến thức lớp 11 phần Đại số",
    sessions: [
      { title: "Buổi 1: Tổng ôn lượng giác (phần 1)", date: "15/06/2025" },
      { title: "Buổi 2: Tổng ôn lượng giác (phần 2)", date: "15/06/2025" },
      { title: "Buổi 3: Tổng ôn CSC – CSN", date: "15/06/2025" },
      { title: "Buổi 4: Tổng ôn hàm số mũ loga", date: "15/06/2025" },
      { title: "Buổi 5: Tổng ôn PT, BPT mũ loga", date: "15/06/2025" },
      { title: "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất", date: "15/06/2025" },
      { title: "Buổi 7: Tổng ôn giới hạn", date: "15/06/2025" },
      { title: "Buổi 8: Tổng ôn phương trình tiếp tuyến & đạo hàm", date: "15/06/2025" },
    ],
  },
  {
    id: "chapter-2",
    progress: "0/9",
    title: "Tổng ôn kiến thức lớp 11 phần Hình học",
    sessions: [
      { title: "Buổi 1: Giới thiệu hình học", date: "16/06/2025" },
      { title: "Buổi 2: Các dạng bài tập", date: "17/06/2025" },
    ],
  },
  {
    id: "chapter-3",
    progress: "0/43",
    title: "[Classin] Chương 1: Hàm số",
    sessions: [
      { title: "Buổi 1: Khái niệm hàm số", date: "18/06/2025" },
      { title: "Buổi 2: Đồ thị hàm số", date: "19/06/2025" },
    ],
  },
  {
    id: "chapter-4",
    progress: "0/1",
    title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "20/06/2025" },
    ],
  },
  {
    id: "chapter-5",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { title: "Buổi 1: Nguyên hàm cơ bản", date: "21/06/2025" },
    ],
  },
  {
    id: "chapter-6",
    progress: "0/12",
    title: "[Classin] Chương 4: Xác suất có điều kiện",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "22/06/2025" },
    ],
  },
  {
    id: "chapter-7",
    progress: "0/32",
    title: "[Classin] Chương 5: Oxyz",
    sessions: [
      { title: "Buổi 1: Hệ tọa độ Oxyz", date: "23/06/2025" },
    ],
  },
  {
    id: "chapter-8",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 1",
    sessions: [
      { title: "Buổi 1: Tổng ôn", date: "24/06/2025" },
    ],
  },
  {
    id: "chapter-9",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 1",
    sessions: [
      { title: "Buổi 1: Tổng ôn", date: "25/06/2025" },
    ],
  },
  {
    id: "chapter-10",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 2",
    sessions: [
      { title: "Buổi 1: Tổng ôn", date: "26/06/2025" },
    ],
  },
  {
    id: "chapter-11",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 2",
    sessions: [
      { title: "Buổi 1: Tổng ôn", date: "27/06/2025" },
    ],
  },
  {
    id: "chapter-12",
    progress: "0/45",
    title: "[SSVOD] Chương 1: Hàm số",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "28/06/2025" },
    ],
  },
  {
    id: "chapter-13",
    progress: "0/2",
    title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "29/06/2025" },
    ],
  },
  {
    id: "chapter-14",
    progress: "0/24",
    title: "[SSVOD] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "30/06/2025" },
    ],
  },
  {
    id: "chapter-15",
    progress: "0/12",
    title: "[SSVOD] Chương 4: Xác suất có điều kiện",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "01/07/2025" },
    ],
  },
  {
    id: "chapter-16",
    progress: "0/26",
    title: "[SSVOD] Chương 5: Oxyz",
    sessions: [
      { title: "Buổi 1: Giới thiệu", date: "02/07/2025" },
    ],
  },
];

const CourseContent = () => {
  const [openChapters, setOpenChapters] = React.useState<string[]>([]);

  const handleAccordionChange = (values: string[]) => {
    setOpenChapters(values);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">BÀI HỌC</h2>
      <p className="text-gray-700 mb-6">
        Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
      </p>

      <Accordion type="multiple" value={openChapters} onValueChange={handleAccordionChange} className="w-full space-y-4">
        {chapters.map((chapter) => {
          const isOpen = openChapters.includes(chapter.id);
          return (
            <Card key={chapter.id} className="p-4 shadow-sm rounded-lg">
              <AccordionItem value={chapter.id} className="border-b-0">
                <AccordionTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:no-underline p-0">
                  <div className="flex items-center space-x-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">
                      {chapter.progress}
                    </span>
                    <span className="text-orange-600 font-semibold">{chapter.title}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 rounded-full px-4 py-2"
                    // Nút này là một phần của AccordionTrigger, nên việc click vào nó sẽ tự động kích hoạt Accordion
                  >
                    {isOpen ? "Ẩn" : "Xem"} <FileText size={16} className="ml-2" />
                  </Button>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0">
                  <div className="space-y-3 pl-4 border-l-2 border-gray-200 ml-6">
                    {chapter.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                          <FileText size={18} className="text-orange-500" />
                          <Play size={18} className="text-orange-500" />
                          <span className="text-gray-800">{session.title}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{session.date}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseContent;