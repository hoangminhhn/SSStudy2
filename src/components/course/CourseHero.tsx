"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, User, CalendarDays, BookOpen } from "lucide-react";

const CourseHero = () => {
  return (
    <Card className="p-6 shadow-lg rounded-lg flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/3 flex-shrink-0">
        <img
          src="/images/20250630150800-ugrw2nuezq.png" // Updated image path with the correct filename
          alt="Course Thumbnail"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          [2K8 - SSLIVE] S1: Chuyên đề - Toán học 12
        </h1>
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Lớp 12 - Luyện thi ĐH
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Toán
          </Badge>
        </div>

        <div className="mb-4 text-gray-700">
          <p className="font-semibold mb-1">Mã lớp học:</p>
          <div className="flex items-center text-sm text-gray-500">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span>(0 đánh giá)</span>
          </div>
        </div>

        <div className="mb-4 text-gray-700">
          <div className="flex items-center mb-1">
            <User size={18} className="text-gray-600 mr-2" />
            <span className="font-semibold">Thầy Nguyễn Tiến Đạt</span>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            <CalendarDays size={16} className="mr-1" />
            Cập nhật: 15/07/2025 23:54:01
            <span className="ml-4 flex items-center">
              <BookOpen size={16} className="mr-1" />
              16 Chương
            </span>
            <span className="ml-4 flex items-center">
              <BookOpen size={16} className="mr-1" />
              254 Bài học
            </span>
          </p>
        </div>

        <div className="mb-4 text-gray-700">
          <p className="font-semibold mb-1">Thời gian:</p>
          <ul className="list-disc list-inside text-sm text-gray-500">
            <li>Ngày khai giảng:</li>
            <li>Ngày bế giảng:</li>
          </ul>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl font-bold text-orange-600">1.000.000đ</span>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 text-lg font-semibold">
            Đã kích hoạt
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseHero;