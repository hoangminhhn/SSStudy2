"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, BookOpen, Clock, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseDetailHeroV2Props {
  courseTitle: string;
  teacherName: string;
  description: string;
  updatedDate: string;
  studentsEnrolled: number;
  originalPrice: string;
  discountedPrice: string;
  countdown: string;
  includes: string[];
  imageUrl: string;
}

const CourseDetailHeroV2: React.FC<CourseDetailHeroV2Props> = ({
  courseTitle,
  teacherName,
  description,
  updatedDate,
  studentsEnrolled,
  originalPrice,
  discountedPrice,
  countdown,
  includes,
  imageUrl,
}) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {courseTitle}
        </h1>
        <p className="text-lg text-gray-700 font-semibold mb-4">
          Thầy {teacherName}
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center space-x-6 text-gray-600 text-sm mb-6">
          <div className="flex items-center">
            <CalendarDays size={16} className="text-blue-500 mr-2" />
            <span>Cập nhật: {updatedDate}</span>
          </div>
          <div className="flex items-center">
            <User size={16} className="text-blue-500 mr-2" />
            <span>{studentsEnrolled} học viên đã học</span>
          </div>
        </div>

        {/* Course Benefits - Placeholder for now, will be a separate component */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-green-700">
            <CheckCircle size={20} className="mr-2" /> Đảm bảo đầu ra.
          </div>
          <div className="flex items-center text-green-700">
            <CheckCircle size={20} className="mr-2" /> Có kiến thức về cấu trúc và cách tiếp cận bài thi IELTS hiệu quả.
          </div>
        </div> */}
      </div>

      <div className="lg:w-1/3 flex-shrink-0">
        <img
          src={imageUrl}
          alt="Course Thumbnail"
          className="w-full h-auto rounded-lg object-cover mb-4"
        />
        <div className="text-center mb-4">
          <span className="text-4xl font-bold text-orange-600 mr-2">{discountedPrice}</span>
          <span className="text-xl text-gray-500 line-through">{originalPrice}</span>
        </div>
        <div className="flex items-center justify-center text-red-600 font-semibold mb-4">
          <Clock size={18} className="mr-2" />
          <span>Kết thúc sau {countdown}</span>
        </div>
        <div className="flex flex-col space-y-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 text-lg font-semibold">
            <ShoppingCart size={20} className="mr-2" />
            Thêm vào giỏ hàng
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-3 text-lg font-semibold">
            Mua ngay
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Khóa học này bao gồm</h3>
          <ul className="space-y-2 text-gray-700">
            {includes.map((item, index) => (
              <li key={index} className="flex items-start">
                <BookOpen size={18} className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CourseDetailHeroV2;