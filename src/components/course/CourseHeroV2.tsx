"use client";

import React from "react";
import { CheckCircle, Calendar, Users } from "lucide-react";

interface CourseHeroV2Props {
  title: string;
  teacher: string;
  description: string;
  updatedDate: string;
  studentCount: number;
  guarantees: string[];
  includes: string[]; // Keep includes prop, but it won't be rendered here
}

const CourseHeroV2: React.FC<CourseHeroV2Props> = ({
  title,
  teacher,
  description,
  updatedDate,
  studentCount,
  guarantees,
  // includes, // No longer used for rendering in this component
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-v2-text-default mb-4">{title}</h1>
      <p className="text-v2-text-muted text-lg mb-4">Giáo viên: <span className="font-semibold text-v2-text-default">{teacher}</span></p>

      <div className="flex items-center text-v2-text-muted text-sm mb-6 space-x-4">
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>Cập nhật: {updatedDate}</span>
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-1" />
          <span>{studentCount} học viên</span>
        </div>
      </div>

      <p className="text-v2-text-default leading-relaxed mb-6">{description}</p>

      <div className="border-t border-v2-border pt-6">
        <h2 className="text-xl font-bold text-v2-text-default mb-4">Cam kết của khóa học</h2>
        <ul className="space-y-2 text-v2-text-default">
          {guarantees.map((guarantee, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle size={20} className="text-v2-primary mr-2 flex-shrink-0 mt-1" />
              <span>{guarantee}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The "Khóa học này bao gồm" section has been removed */}
    </div>
  );
};

export default CourseHeroV2;