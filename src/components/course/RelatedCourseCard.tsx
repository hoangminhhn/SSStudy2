"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface RelatedCourseCardProps {
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

const RelatedCourseCard: React.FC<RelatedCourseCardProps> = ({
  id,
  imageUrl,
  category,
  title,
  teacher,
  lessonsCount,
  exercisesCount,
  discountedPrice,
  originalPrice,
}) => {
  return (
    <Link to={`/course-v2/${id}`} className="block hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden">
      <Card className="h-full flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        <CardContent className="p-4 flex-grow flex flex-col">
          <p className="text-sm text-blue-600 font-semibold mb-1">{category}</p>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">Thầy {teacher}</p>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <BookOpen size={16} className="mr-1" />
            <span>{lessonsCount} bài giảng</span>
            <FileText size={16} className="ml-4 mr-1" />
            <span>{exercisesCount} bài tập</span>
          </div>
          <div className="mt-auto flex items-baseline">
            <span className="text-xl font-bold text-orange-600 mr-2">{discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RelatedCourseCard;