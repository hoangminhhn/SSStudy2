"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Fire, BookOpen, User, CalendarDays, Globe, FileText, Star, ChevronDown, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Program {
  id: string;
  title: string;
  bgClass: string;
  icon: React.ReactNode;
  to?: string;
}

const PROGRAMS: Program[] = [
  { id: "p-1", title: "Combo luyện thi 2025", bgClass: "bg-red-50", icon: <BookOpen className="text-red-600" /> },
  { id: "p-2", title: "Combo luyện thi 2026", bgClass: "bg-pink-50", icon: <Award className="text-pink-600" /> },
  { id: "p-3", title: "Luyện thi cấp tốc", bgClass: "bg-sky-50", icon: <CalendarDays className="text-sky-600" /> },
  { id: "p-4", title: "Luyện thi DGNL/ĐGTD", bgClass: "bg-orange-50", icon: <Star className="text-orange-600" /> },
  { id: "p-5", title: "Đại học - Cao đẳng", bgClass: "bg-violet-50", icon: <User className="text-violet-600" /> },
  { id: "p-6", title: "Sách luyện thi", bgClass: "bg-emerald-50", icon: <FileText className="text-emerald-600" /> },
  { id: "p-7", title: "Luyện thi học sinh giỏi", bgClass: "bg-green-50", icon: <Star className="text-green-600" /> },
  { id: "p-8", title: "Luyện thi vào lớp 10", bgClass: "bg-blue-50", icon: <Globe className="text-blue-600" /> },
  { id: "p-9", title: "Điểm cao lớp 10 - 11", bgClass: "bg-rose-50", icon: <User className="text-rose-600" /> },
];

const ProgramItem: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <Link
      to={program.to ?? "/courses"}
      className="block"
      aria-label={program.title}
    >
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", program.bgClass)}>
            {program.icon}
          </div>
          <div className="text-sm font-medium text-gray-800">{program.title}</div>
        </div>

        <div className="text-gray-400">
          <ChevronDown size={18} />
        </div>
      </div>
    </Link>
  );
};

const ProgramsSection: React.FC = () => {
  return (
    <section
      aria-label="Các chương trình học tại SSStudy"
      className="py-12"
      style={{ background: "linear-gradient(180deg,#f3fbff 0%, #f7fbff 100%)" }}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Main white card */}
          <Card className="rounded-xl shadow-lg p-6 md:p-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
                Các chương trình học tại SSSTUDY
              </h2>

              <div className="mt-3 text-sm text-red-500 flex items-center space-x-2">
                <span className="text-base">🏅</span>
                <span>Chính sách cam kết điểm số tại SSStudy</span>
                <span className="text-red-400">→</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROGRAMS.map((p) => (
                <ProgramItem key={p.id} program={p} />
              ))}
            </div>
          </Card>

          {/* Floating fire badge */}
          <div className="absolute -top-4 -left-4">
            <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <Fire className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;