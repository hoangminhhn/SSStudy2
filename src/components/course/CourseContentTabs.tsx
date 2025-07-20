"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CourseContent from "./CourseContent"; // Reusing existing CourseContent
import CourseReview from "./CourseReview"; // Reusing existing CourseReview

interface CourseContentTabsProps {
  courseId: string; // To potentially filter content later
}

const CourseContentTabs: React.FC<CourseContentTabsProps> = ({ courseId }) => {
  return (
    <Tabs defaultValue="content" className="w-full mt-8">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Nội dung khóa học</TabsTrigger>
        <TabsTrigger value="teacher">Giáo viên</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
      </TabsList>
      <TabsContent value="content" className="p-4 bg-white rounded-lg shadow-sm">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Tìm kiếm đề thi - bài học ở đây"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <CourseContent />
      </TabsContent>
      <TabsContent value="teacher" className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin Giáo viên</h3>
        <p className="text-gray-700">
          Thông tin chi tiết về giáo viên sẽ được cập nhật tại đây.
        </p>
      </TabsContent>
      <TabsContent value="reviews" className="p-4 bg-white rounded-lg shadow-sm">
        <CourseReview />
      </TabsContent>
    </Tabs>
  );
};

export default CourseContentTabs;