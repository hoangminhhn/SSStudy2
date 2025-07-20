"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CalendarDays, GraduationCap, CheckCircle } from "lucide-react";

interface CourseHeroV3Props {
  title: string;
  teacher: string;
  description: string;
  guarantees: string[];
}

const CourseHeroV3: React.FC<CourseHeroV3Props> = ({
  title,
  teacher,
  description,
  guarantees,
}) => {
  return (
    <div className="space-y-6"> {/* Container to add space between the two cards */}
      {/* First Card: Course general information */}
      <Card className="p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-v3-text-default mb-2">{title}</h1>
        <p className="text-lg text-v3-text-muted mb-4">Thầy {teacher}</p>
        <p className="text-v3-text-default mb-4">{description}</p>
        <div className="flex items-center text-v3-text-muted text-sm space-x-4">
          <div className="flex items-center text-blue-600">
            <CalendarDays className="mr-1" size={16} />
            <span>Cập nhật vào tháng 4 năm 2025</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="mr-1" size={16} />
            <span>2358 học viên đã học</span>
          </div>
        </div>
      </Card>

      {/* Second Card: Guarantees/Benefits */}
      <Card className="p-6 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={20} />
              <p className="text-v3-text-default">{guarantee}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CourseHeroV3;