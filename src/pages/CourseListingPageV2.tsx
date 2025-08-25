"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CategorySidebar from "@/components/layout/CategorySidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  teacher: string;
  description: string;
  image: string;
  currentPrice: string;
  oldPrice?: string;
  lessons?: number;
  exercises?: number;
}

const COURSES: Course[] = [
  {
    id: "math-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
  {
    id: "physics-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Vật lý 12",
    teacher: "Cô Phạm Thị H",
    description: "Khóa tập trung luyện chuyên sâu giúp nắm vững kỹ năng giải bài.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 25,
    exercises: 20,
  },
  {
    id: "chemistry-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Hóa học 12",
    teacher: "Thầy Lê Văn K",
    description: "Cung cấp kiến thức toàn diện về Hóa học hữu cơ & vô cơ.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 28,
    exercises: 25,
  },
  {
    id: "english-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Tiếng Anh 12",
    teacher: "Cô Nguyễn Thị M",
    description: "Nâng cao kỹ năng tiếng Anh cho kỳ thi THPT & quốc tế.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 35,
    exercises: 30,
  },
  {
    id: "math-12-s1-2",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12 (2)",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Phiên bản nâng cao, chuyên sâu giải đề.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
  {
    id: "math-12-s1-3",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12 (3)",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Bộ đề luyện thi & hướng dẫn chi tiết.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card className="rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gradient-to-b from-sky-100 to-white p-4 flex items-center justify-center">
        <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-lg" />
      </div>
      <CardContent className="p-4">
        <Link to={`/courses-v2/${course.id}`} className="text-blue-600 font-semibold block hover:underline line-clamp-2">
          {course.title}
        </Link>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500 flex items-center space-x-3">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-gray-400" />
              <span>{course.lessons ?? 0} bài giảng</span>
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1 text-gray-400" />
              <span>{course.exercises ?? 0} bài tập</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-red-600">{course.currentPrice}</div>
            {course.oldPrice && <div className="text-xs text-gray-400 line-through">{course.oldPrice}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CourseListingPageV2: React.FC = () => {
  // pagination stub
  const [page, setPage] = React.useState(1);
  const perPage = 6;
  const total = COURSES.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const displayed = COURSES.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Khóa học" bgColor="white" variant="v2" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <CategorySidebar />
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Filters row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <h1 className="text-xl font-semibold text-gray-800">Các Khóa Học (Phiên bản V2)</h1>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm">
                  <option>Giảng viên</option>
                  <option>Nguyễn Tiến Đạt</option>
                  <option>Phạm Thị H</option>
                </select>
                <select className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm">
                  <option>Giá tiền</option>
                  <option>0 - 500k</option>
                  <option>500k - 2 triệu</option>
                </select>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={cn("px-3 py-1 rounded-md border", page === 1 ? "bg-white text-gray-400 border-gray-200" : "bg-white text-gray-700 border-gray-300")}
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "px-3 py-1 rounded-md border",
                      page === n ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
                    )}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={cn("px-3 py-1 rounded-md border", page === totalPages ? "bg-white text-gray-400 border-gray-200" : "bg-white text-gray-700 border-gray-300")}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseListingPageV2;