"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";

const CourseListingPage = () => {
  // Dummy course data for demonstration
  const courses = [
    {
      id: "math-12-s1",
      title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12",
      teacher: "Thầy Nguyễn Tiến Đạt",
      description: "Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học.",
      image: "/images/20250630150800-ugrw2nuezq.png",
    },
    {
      id: "physics-12-s1",
      title: "[2K8 - SSLIVE] S1: Chuyên đề - Vật lý 12",
      teacher: "Cô Phạm Thị H",
      description: "Khóa học chuyên sâu về các chuyên đề vật lý lớp 12, giúp học sinh nắm vững kiến thức và kỹ năng giải bài tập.",
      image: "https://via.placeholder.com/400x200?text=Physics+Course",
    },
    {
      id: "chemistry-12-s1",
      title: "[2K8 - SSLIVE] S1: Chuyên đề - Hóa học 12",
      teacher: "Thầy Lê Văn K",
      description: "Cung cấp kiến thức toàn diện về hóa học hữu cơ và vô cơ lớp 12, chuẩn bị cho kỳ thi THPT Quốc gia.",
      image: "https://via.placeholder.com/400x200?text=Chemistry+Course",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Các Khóa Học Nổi Bật</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="shadow-lg rounded-lg overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{course.description}</p>
                <div className="flex items-center text-gray-700 text-sm mb-4">
                  <User size={16} className="mr-2 text-gray-500" />
                  <span>{course.teacher}</span>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-2">
                    Xem chi tiết <BookOpen size={16} className="ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseListingPage;