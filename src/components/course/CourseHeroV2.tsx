"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseHeroV2Props {
  title: string;
  teacher: string;
  description: string;
  updatedDate: string;
  studentCount: number;
  guarantees: string[];
  includes: string[]; // This prop will no longer be rendered in this component
}

const CourseHeroV2: React.FC<CourseHeroV2Props> = ({
  title,
  teacher,
  description,
  updatedDate,
  studentCount,
  guarantees,
  includes, // Still destructuring, but not used for rendering the section
}) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-v2-text-default mb-2">{title}</h1>
      <p className="text-lg text-v2-text-muted mb-4">Thầy {teacher}</p>
      <p className="text-v2-text-default mb-4">{description}</p>

      <div className="flex items-center space-x-6 text-v2-text-muted text-sm mb-6">
        <div className="flex items-center">
          <CalendarDays size={16} className="mr-2" />
          <span>Cập nhật: {updatedDate}</span>
        </div>
        <div className="flex items-center">
          <Users size={16} className="mr-2" />
          <span>{studentCount} học viên đã học</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {guarantees.map((item, index) => (
          <div key={index} className="flex items-start text-v2-text-default">
            <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" /> {/* Keep green for success */}
            <p className="text-sm">{item}</p>
          </div>
        ))}
      </div>

      {/* Removed the "Khóa học này bao gồm" section */}
      {/*
      <div className="border-t border-v2-border pt-6">
        <h2 className="text-xl font-bold text-v2-text-default mb-4">Khóa học này bao gồm</h2>
        <ul className="space-y-2 text-v2-text-default">
          {includes.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-v2-text-muted rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <p className="text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      */}
    </Card>
  );
};

export default CourseHeroV2;