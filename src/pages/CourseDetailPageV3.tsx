"use client";

import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CourseHeroV3 from "@/components/course/CourseHeroV3";
import CoursePurchaseCardV3 from "@/components/course/CoursePurchaseCardV3";
import CourseContentTabsV3 from "@/components/course/CourseContentTabsV3";
import RelatedCoursesV3 from "@/components/course/RelatedCoursesV3";

const CourseDetailPageV3 = () => {
  const { courseId } = useParams<{ courseId: string }>();

  // Dummy data for the specific course (replace with actual data fetching)
  const dummyCourseData = {
    id: "math-12-s1",
    title: "Khóa: Master HSA - giai đoạn 1 năm học 2025 (Phiên bản V3)",
    teacher: "Nguyễn Tiến Đạt",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla",
    updatedDate: "tháng 4 năm 2025",
    studentCount: 2358,
    rating: 4.5, // New: Rating score
    numberOfRatings: 1799, // New: Number of ratings
    guarantees: [
      "Đảm bảo đầu ra.",
      "Hình thành tư duy học đúng. Bổ Tư duy đọc dịch, viết dịch, nói dịch.",
      "Hiểu nhanh, chính xác nội dung một bài hoàn chỉnh thuộc nhiều chủ đề khó, lạ, thiếu từ vựng.",
      "Có kiến thức về cấu trúc và cách tiếp cận bài thi IELTS hiệu quả.",
      "Nói và viết một đoạn/ một bài nhanh, lưu loát, tự nhiên và liên kết, kể cả khi gặp chủ đề lạ.",
      "Áp dụng vốn từ vựng và ngữ pháp để nói và viết hai câu đơn liên kết và lưu loát.",
    ],
    purchaseCard: {
      imageUrl: "/images/20250630150800-ugrw2nuezq.png", // Updated image path
      currentPrice: "2.500.000đ",
      oldPrice: "5.000.000đ",
      countdown: "1d:6h:48m:16s",
      promoText: "*Ưu đãi Hè, đăng ký trước 15/3/2025",
      includedItems: [
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
    },
  };

  // In a real app, you'd fetch data based on courseId
  const course = dummyCourseData; // For now, always use dummy data

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Khóa học không tìm thấy.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col v3-theme">
      <Header />
      <BreadcrumbNav courseTitle={course.title} bgColor="gray-50" variant="v3" />
      <main className="flex-grow container mx-auto px-4 pt-0 pb-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 mt-8">
            <CourseHeroV3
              title={course.title}
              teacher={course.teacher}
              description={course.description}
              guarantees={course.guarantees}
              rating={course.rating} // Pass new prop
              numberOfRatings={course.numberOfRatings} // Pass new prop
            />
            {/* CourseContentTabs moved inside the lg:col-span-2 div */}
            <CourseContentTabsV3 courseId={course.id} />
          </div>
          <div className="lg:col-span-1 mt-0">
            <CoursePurchaseCardV3
              imageUrl={course.purchaseCard.imageUrl}
              currentPrice={course.purchaseCard.currentPrice}
              oldPrice={course.purchaseCard.oldPrice}
              countdown={course.purchaseCard.countdown}
              promoText={course.purchaseCard.promoText}
              includedItems={course.purchaseCard.includedItems}
            />
          </div>
        </div>
        {/* RelatedCourses remains outside the grid to span full width if desired, or can be moved */}
        <RelatedCoursesV3 currentCourseId={course.id} />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPageV3;