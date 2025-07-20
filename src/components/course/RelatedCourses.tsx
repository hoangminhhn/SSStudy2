"use client";

import React from "react";
import RelatedCourseCard from "./RelatedCourseCard";

interface RelatedCourse {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  teacher: string;
  lessonsCount: number;
  exercisesCount: number;
  discountedPrice: string;
  originalPrice: string;
}

interface RelatedCoursesProps {
  courses: RelatedCourse[];
}

const dummyRelatedCourses: RelatedCourse[] = [
  {
    id: "master-hsa-giai-doan-1",
    imageUrl: "https://via.placeholder.com/300x200?text=Course+1",
    category: "Luyện thi học sinh giỏi",
    title: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    teacher: "Nguyễn Tiến Đạt",
    lessonsCount: 30,
    exercisesCount: 30,
    discountedPrice: "2.500.000đ",
    originalPrice: "5.000.000đ",
  },
  {
    id: "master-hsa-giai-doan-2",
    imageUrl: "https://via.placeholder.com/300x200?text=Course+2",
    category: "Luyện thi học sinh giỏi",
    title: "Khóa: Master HSA - giai đoạn 2 năm học 2025...",
    teacher: "Trần Thị B",
    lessonsCount: 25,
    exercisesCount: 25,
    discountedPrice: "2.500.000đ",
    originalPrice: "5.000.000đ",
  },
  {
    id: "master-hsa-giai-doan-3",
    imageUrl: "https://via.placeholder.com/300x200?text=Course+3",
    category: "Luyện thi học sinh giỏi",
    title: "Khóa: Master HSA - giai đoạn 3 năm học 2025...",
    teacher: "Lê Văn C",
    lessonsCount: 35,
    exercisesCount: 35,
    discountedPrice: "2.500.000đ",
    originalPrice: "5.000.000đ",
  },
  {
    id: "master-hsa-giai-doan-4",
    imageUrl: "https://via.placeholder.com/300x200?text=Course+4",
    category: "Luyện thi học sinh giỏi",
    title: "Khóa: Master HSA - giai đoạn 4 năm học 2025...",
    teacher: "Phạm Thị D",
    lessonsCount: 28,
    exercisesCount: 28,
    discountedPrice: "2.500.000đ",
    originalPrice: "5.000.000đ",
  },
];

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ courses = dummyRelatedCourses }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Các khóa học liên quan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <RelatedCourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;