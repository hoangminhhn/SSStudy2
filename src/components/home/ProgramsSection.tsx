"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { BookOpen, Award, Zap, Users, Book, Globe, Star, GraduationCap, ChevronDown, Fire } from "lucide-react";
import { cn } from "@/lib/utils";

type Program = {
  id: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  to?: string;
};

const PROGRAMS: Program[] = [
  { id: "p1", title: "Combo luyện thi 2025", icon: <BookOpen className="w-5 h-5" />, iconBg: "bg-blue-50 text-blue-600" },
  { id: "p2", title: "Combo luyện thi 2026", icon: <Award className="w-5 h-5" />, iconBg: "bg-pink-50 text-pink-600" },
  { id: "p3", title: "Luyện thi cấp tốc", icon: <Zap className="w-5 h-5" />, iconBg: "bg-sky-50 text-sky-600" },
  { id: "p4", title: "Luyện thi DGNL/ĐGTD", icon: <Users className="w-5 h-5" />, iconBg: "bg-orange-50 text-orange-600" },
  { id: "p5", title: "Đại học - Cao đẳng", icon: <GraduationCap className="w-5 h-5" />, iconBg: "bg-violet-50 text-violet-600" },
  { id: "p6", title: "Sách luyện thi", icon: <Book className="w-5 h-5" />, iconBg: "bg-emerald-50 text-emerald-600" },
  { id: "p7", title: "Luyện thi học sinh giỏi", icon: <Star className="w-5 h-5" />, iconBg: "bg-green-50 text-green-600" },
  { id: "p8", title: "Luyện thi vào lớp 10", icon: <Globe className="w-5 h-5" />, iconBg: "bg-blue-50 text-blue-600" },
  { id: "p9", title: "Điểm cao lớp 10 - 11", icon: <Users className="w-5 h-5" />, iconBg: "bg-rose-50 text-rose-600" },
];

const ProgramCard: React.FC<{ p: Program }> = ({ p }) => {
  return (
    <Link to={p.to ?? "/courses"} className="block" aria-label={p.title}>
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-md px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", p.iconBg)}>
            {p.icon}
          </div>
          <div className="text-sm font-medium text-gray-800">{p.title}</div>
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
      style={{ background: "linear-gradient(180deg,#f6fbff 0%, #f3f9ff 100%)" }}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* floating fire badge */}
          <div className="absolute -left-4 -top-4 z-10">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Fire className="text-red-600" />
              </div>
            </div>
          </div>

          <Card className="rounded-xl shadow-lg p-6 md:p-10">
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                Các chương trình học tại SSSTUDY
              </h2>

              <div className="mt-3 text-sm text-red-500 flex items-center space-x-2">
                <span className="text-sm">🏅</span>
                <span>Chính sách cam kết điểm số tại SSStudy</span>
                <span className="text-red-400">→</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROGRAMS.map((p) => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;