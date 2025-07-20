"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";

interface RelatedCoursesV3Props {
  currentCourseId?: string;
}

const RelatedCoursesV3: React.FC<RelatedCoursesV3Props> = ({ currentCourseId }) => {
  const allCourses = [
    {
      id: "math-12-s1",
      title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12",
      teacher: "Thầy Nguyễn Tiến Đạt",
      description: "Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học.",
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
      description: "Khóa học chuyên sâu về các chuyên đề vật lý lớp 12, giúp học sinh nắm vững kiến thức và kỹ năng giải bài tập.",
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
      description: "Cung cấp kiến thức toàn diện về hóa học hữu cơ và vô cơ lớp 12, chuẩn bị cho kỳ thi THPT Quốc gia.",
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
      description: "Khóa học giúp học sinh nâng cao kỹ năng tiếng Anh, chuẩn bị cho các kỳ thi quốc tế và THPT.",
      image: "/images/20250630150800-ugrw2nuezq.png",
      currentPrice: "2.500.000đ",
      oldPrice: "5.000.000đ",
      lessons: 35,
      exercises: 30,
    },
  ];

  const courses = allCourses.filter(course => course.id !== currentCourseId);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-v3-text-default mb-6 text-center">Các khóa học liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-lg rounded-lg overflow-hidden bg-v3-background border-v3-border">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-v3-text-default line-clamp-2">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-v3-text-muted text-sm mb-2">Thầy {course.teacher}</p>
              <div className="flex items-center text-v3-text-default text-xs mb-3 space-x-3">
                <div className="flex items-center">
                  <BookOpen size={14} className="mr-1 text-v3-text-muted" />
                  <span>{course.lessons} bài giảng</span>
                </div>
                <div className="flex items-center">
                  <User size={14} className="mr-1 text-v3-text-muted" />
                  <span>{course.exercises} bài tập</span>
                </div>
              </div>
              <div className="flex items-baseline mb-4">
                <span className="text-xl font-bold text-v3-primary mr-2">{course.currentPrice}</span>
                <span className="text-sm text-v3-text-muted line-through">{course.oldPrice}</span>
              </div>
              <Link to={`/courses-v3/${course.id}`}>
                <Button className="w-full bg-v3-primary hover:bg-v3-primary/90 text-v3-primary-foreground rounded-full py-2">
                  Xem chi tiết V3 <BookOpen size={16} className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedCoursesV3;