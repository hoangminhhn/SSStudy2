"use client";

import React from "react";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import Footer from "@/components/layout/Footer";
import CourseDetailHeroV2 from "@/components/course/CourseDetailHeroV2";
import CourseBenefits from "@/components/course/CourseBenefits";
import CourseContent from "@/components/course/CourseContent";
import CourseReview from "@/components/course/CourseReview";
import RelatedCourses from "@/components/course/RelatedCourses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CourseDetailPageV2 = () => {
  // Dummy data for CourseDetailHeroV2
  const courseData = {
    courseTitle: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacherName: "Nguyễn Tiến Đạt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla",
    updatedDate: "tháng 4 năm 2025",
    studentsEnrolled: 2358,
    originalPrice: "5.000.000đ",
    discountedPrice: "2.500.000đ",
    countdown: "1d:6h:48m:16s",
    includes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
    imageUrl: "https://via.placeholder.com/600x400?text=LIVESTREAM+TOAN+11",
  };

  // Dummy data for CourseBenefits
  const benefitsData = [
    "Đảm bảo đầu ra.",
    "Có kiến thức về cấu trúc và cách tiếp cận bài thi IELTS hiệu quả.",
    "Hình thành tư duy học đúng. Bộ Tư duy đọc dịch, viết dịch, nói dịch.",
    "Nói và viết một đoạn/ một bài nhanh, lưu loát, tự nhiên và liên kết, kể cả khi gặp chủ đề lạ.",
    "Hiểu nhanh, chính xác nội dung một bài hoàn chỉnh thuộc nhiều chủ đề khó, lạ, thiếu từ vựng.",
    "Áp dụng vốn từ vựng và ngữ pháp để nói và viết hai câu đơn liên kết và lưu loát.",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle={courseData.courseTitle} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CourseDetailHeroV2 {...courseData} />
        <CourseBenefits benefits={benefitsData} />

        <div className="mt-8">
          <Tabs defaultValue="course-content" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto bg-white p-0 rounded-lg shadow-sm border border-gray-200">
              <TabsTrigger
                value="course-content"
                className="py-3 text-lg font-semibold text-gray-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-l-lg"
              >
                Nội dung khóa học
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="py-3 text-lg font-semibold text-gray-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                Giáo viên
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="py-3 text-lg font-semibold text-gray-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-r-lg"
              >
                Đánh giá
              </TabsTrigger>
            </TabsList>

            <TabsContent value="course-content" className="mt-6">
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

            <TabsContent value="teacher" className="mt-6">
              <div className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Thông tin giáo viên: Thầy {courseData.teacherName}</h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <CourseReview />
            </TabsContent>
          </Tabs>
        </div>

        <RelatedCourses />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPageV2;