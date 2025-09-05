"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";

interface Course {
  id: string;
  title: string;
  subtitle?: string;
  teacher?: string;
  lessons?: number;
  exercises?: number;
  image: string;
  price: string;
  oldPrice?: string;
}

const COURSES: Course[] = [
  {
    id: "math-12-s1",
    title: "Luyện thi học sinh giỏi",
    subtitle: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacher: "Thầy Nguyễn Tiến Đạt",
    lessons: 30,
    exercises: 30,
    image: "/images/20250630150800-ugrw2nuezq.png",
    price: "2.500.000đ",
    oldPrice: "5.000.000đ",
  },
  {
    id: "physics-12-s1",
    title: "Luyện thi học sinh giỏi",
    subtitle: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacher: "Cô Phạm Thị H",
    lessons: 28,
    exercises: 20,
    image: "/images/20250630150800-ugrw2nuezq.png",
    price: "2.500.000đ",
    oldPrice: "5.000.000đ",
  },
  {
    id: "chemistry-12-s1",
    title: "Luyện thi học sinh giỏi",
    subtitle: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacher: "Thầy Lê Văn K",
    lessons: 25,
    exercises: 18,
    image: "/images/20250630150800-ugrw2nuezq.png",
    price: "2.500.000đ",
    oldPrice: "5.000.000đ",
  },
  {
    id: "english-12-s1",
    title: "Luyện thi học sinh giỏi",
    subtitle: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacher: "Cô Nguyễn Thị M",
    lessons: 35,
    exercises: 30,
    image: "/images/20250630150800-ugrw2nuezq.png",
    price: "2.500.000đ",
    oldPrice: "5.000.000đ",
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card className="rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-b from-sky-50 to-white">
        <img src={course.image} alt={course.title} className="w-full h-44 object-cover" />
      </div>

      <CardContent className="p-4">
        <div className="text-xs text-blue-600 font-semibold mb-1">Luyện thi học sinh giỏi</div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">{course.subtitle}</h3>

        <div className="text-sm text-gray-500 mb-3">Thầy {course.teacher}</div>

        <div className="flex items-center text-xs text-gray-500 gap-4 mb-3">
          <div className="flex items-center gap-1">
            <BookOpen size={14} className="text-gray-400" />
            <span>{course.lessons ?? 0} bài giảng</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} className="text-gray-400" />
            <span>{course.exercises ?? 0} bài tập</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div className="text-lg font-bold text-red-600">{course.price}</div>
          {course.oldPrice && <div className="text-sm text-gray-400 line-through">{course.oldPrice}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedCourses: React.FC = () => {
  return (
    <section aria-labelledby="featured-heading" className="py-12 bg-gradient-to-b from-blue-50/40 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center mb-6">
          <div />
          <h2 id="featured-heading" className="text-center text-2xl font-bold text-gray-700">
            Khóa học nổi bật
          </h2>
          <div className="text-right">
            <Link to="/courses-v2" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              Xem tất cả <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((c) => (
            <Link key={c.id} to={`/courses-v2/${c.id}`} className="block">
              <CourseCard course={c} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;