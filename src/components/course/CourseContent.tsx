"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface Lesson {
  progress: string;
  title: string;
}

const lessons: Lesson[] = [
  { progress: "0/8", title: "Tổng ôn kiến thức lớp 11 phần Đại số" },
  { progress: "0/9", title: "Tổng ôn kiến thức lớp 11 phần Hình học" },
  { progress: "0/43", title: "[Classin] Chương 1: Hàm số" },
  { progress: "0/1", title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm" },
  { progress: "0/20", title: "[Classin] Chương 3: Nguyên hàm tích phân" },
  { progress: "0/12", title: "[Classin] Chương 4: Xác suất có điều kiện" },
  { progress: "0/32", title: "[Classin] Chương 5: Oxyz" },
  { progress: "0/4", title: "[Classin] Ôn tập giữa kì 1" },
  { progress: "0/6", title: "[Classin] Ôn tập học kì 1" },
  { progress: "0/4", title: "[Classin] Ôn tập giữa kì 2" },
  { progress: "0/6", title: "[Classin] Ôn tập học kì 2" },
  { progress: "0/45", title: "[SSVOD] Chương 1: Hàm số" },
  { progress: "0/2", title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm" },
  { progress: "0/24", title: "[SSVOD] Chương 3: Nguyên hàm tích phân" },
  { progress: "0/12", title: "[SSVOD] Chương 4: Xác suất có điều kiện" },
  { progress: "0/26", title: "[SSVOD] Chương 5: Oxyz" },
];

const CourseContent = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">BÀI HỌC</h2>
      <p className="text-gray-700 mb-6">
        Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
      </p>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <Card key={index} className="p-4 shadow-sm rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">
                {lesson.progress}
              </span>
              <span className="text-gray-800 font-medium">{lesson.title}</span>
            </div>
            <Button variant="outline" className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600">
              Xem <BookOpen size={16} className="ml-2" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;