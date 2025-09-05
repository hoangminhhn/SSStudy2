"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Fire, Calendar, Zap, BookOpen, GraduationCap, Book, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

type Program = {
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass: string;
};

const PROGRAMS: Program[] = [
  { id: "combo-2025", title: "Combo luyện thi 2025", icon: <Calendar size={18} />, colorClass: "bg-amber-100 text-amber-600" },
  { id: "combo-2026", title: "Combo luyện thi 2026", icon: <Calendar size={18} />, colorClass: "bg-red-100 text-red-600" },
  { id: "cap-toc", title: "Luyện thi cấp tốc", icon: <Zap size={18} />, colorClass: "bg-sky-100 text-sky-600" },
  { id: "dgln", title: "Luyện thi ĐGNL/ĐGTD", icon: <Users size={18} />, colorClass: "bg-orange-100 text-orange-600" },
  { id: "daihoc", title: "Đại học - Cao đẳng", icon: <GraduationCap size={18} />, colorClass: "bg-indigo-100 text-indigo-600" },
  { id: "sach", title: "Sách luyện thi", icon: <Book size={18} />, colorClass: "bg-green-100 text-green-600" },
  { id: "hsg", title: "Luyện thi học sinh giỏi", icon: <Star size={18} />, colorClass: "bg-emerald-100 text-emerald-600" },
  { id: "vao-10", title: "Luyện thi vào lớp 10", icon: <BookOpen size={18} />, colorClass: "bg-sky-50 text-sky-700" },
  { id: "diem-cao", title: "Điểm cao lớp 10 - 11", icon: <Fire size={18} />, colorClass: "bg-pink-100 text-pink-600" },
];

const ProgramsSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">Các chương trình học tại SSSTUDY</h2>
          <div className="mt-2 text-sm text-red-500 flex items-center justify-center space-x-2">
            <span>🥇</span>
            <Link to="#" className="underline">
              Chính sách cam kết điểm số tại SSStudy
            </Link>
            <span className="text-gray-400">→</span>
          </div>
        </div>

        <Card className="p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition"
                aria-label={p.title}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${p.colorClass} w-10 h-10 rounded-md flex items-center justify-center shadow-sm`}>
                    {p.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-800">{p.title}</div>
                  </div>
                </div>

                <div className="text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProgramsSection;