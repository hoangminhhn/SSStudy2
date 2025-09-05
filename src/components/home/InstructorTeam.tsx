"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bgClass: string;
}

const DEFAULT_INSTRUCTORS: Instructor[] = [
  {
    id: "i-1",
    name: "Thầy Dĩ Thâm",
    role: "Giáo viên vật lý",
    image: "/images/anh-giao-vien.png",
    bgClass: "bg-gradient-to-b from-pink-50 to-pink-100",
  },
  {
    id: "i-2",
    name: "Nguyễn Bá Thơ",
    role: "Giáo viên vật lý",
    image: "/images/anh-giao-vien.png",
    bgClass: "bg-gradient-to-b from-sky-50 to-sky-100",
  },
  {
    id: "i-3",
    name: "Từ Kim Loan",
    role: "Giáo viên vật lý",
    image: "/images/anh-giao-vien.png",
    bgClass: "bg-gradient-to-b from-amber-50 to-amber-100",
  },
  {
    id: "i-4",
    name: "Nguyễn Bá Thơ",
    role: "Giáo viên vật lý",
    image: "/images/anh-giao-vien.png",
    bgClass: "bg-gradient-to-b from-sky-50 to-sky-100",
  },
];

const InstructorCard: React.FC<{ inst: Instructor }> = ({ inst }) => {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={cn("w-full h-64 flex items-center justify-center", inst.bgClass)}>
        <div className="w-44 h-44 rounded-lg overflow-hidden bg-white p-3">
          <img
            src={inst.image}
            alt={inst.name}
            className="w-full h-full object-contain object-top"
          />
        </div>
      </div>

      <CardContent className="pt-4 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-800">{inst.name}</div>
            <div className="text-xs text-gray-500 mt-1">{inst.role}</div>
          </div>
          <div className="text-blue-600">
            <Star size={18} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InstructorTeam: React.FC<{ instructors?: Instructor[] }> = ({ instructors = DEFAULT_INSTRUCTORS }) => {
  return (
    <section aria-labelledby="instructor-team-heading" className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h3 id="instructor-team-heading" className="text-center text-2xl sm:text-3xl font-bold text-slate-900">
            Đội ngũ giảng viên
          </h3>
          <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
            Xem tất cả <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst) => (
            <InstructorCard key={inst.id} inst={inst} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorTeam;