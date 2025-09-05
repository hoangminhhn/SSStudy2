"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  FileText,
  Users,
  Gift,
  Star,
  ChevronDown,
  Rocket,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  colorClass?: string;
}

const PROGRAM_ITEMS: ProgramItem[] = [
  { id: "p-1", title: "Combo luyện thi 2025", icon: <BookOpen size={20} />, colorClass: "bg-blue-50 text-blue-600" },
  { id: "p-2", title: "Combo luyện thi 2026", icon: <BookOpen size={20} />, colorClass: "bg-red-50 text-red-600" },
  { id: "p-3", title: "Luyện thi cấp tốc", icon: <Rocket size={20} />, colorClass: "bg-sky-50 text-sky-600" },
  { id: "p-4", title: "Luyện thi DGNL/DGTD", icon: <FileText size={20} />, colorClass: "bg-orange-50 text-orange-600" },
  { id: "p-5", title: "Đại học - Cao đẳng", icon: <GraduationCap size={20} />, colorClass: "bg-violet-50 text-violet-600" },
  { id: "p-6", title: "Sách luyện thi", icon: <Gift size={20} />, colorClass: "bg-green-50 text-green-600" },
  { id: "p-7", title: "Luyện thi học sinh giỏi", icon: <Users size={20} />, colorClass: "bg-emerald-50 text-emerald-600" },
  { id: "p-8", title: "Luyện thi vào lớp 10", icon: <FileText size={20} />, colorClass: "bg-indigo-50 text-indigo-600" },
  { id: "p-9", title: "Điểm cao lớp 10 - 11", icon: <Star size={20} />, colorClass: "bg-pink-50 text-pink-600" },
];

const ProgramsSection: React.FC = () => {
  return (
    <section aria-labelledby="programs-heading" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 id="programs-heading" className="text-2xl sm:text-3xl font-bold text-gray-800">
            Các chương trình học tại SSSTUDY
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            <span role="img" aria-label="badge">🎖️</span>{" "}
            <Link to="#" className="inline-flex items-center text-sm text-red-500 hover:underline">
              Chính sách cam kết điểm số tại SSStudy
              <span className="ml-2">→</span>
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PROGRAM_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center justify-between gap-4 border rounded-lg p-3 hover:shadow-sm transition"
                aria-label={item.title}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${item.colorClass ?? "bg-gray-100 text-gray-700"}`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-800">{item.title}</div>
                  </div>
                </div>

                <div className="text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;