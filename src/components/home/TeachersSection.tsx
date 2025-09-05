"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
}

const TEACHERS: Teacher[] = [
  { id: "t-1", name: "Thầy Dĩ Thâm", role: "Giáo viên vật lý", image: "/images/anh-giang-vien.png" },
  { id: "t-2", name: "Nguyễn Bá Thọ", role: "Giáo viên vật lý", image: "/images/anh-giang-vien.png" },
  { id: "t-3", name: "Từ Kim Loan", role: "Giáo viên vật lý", image: "/images/anh-giang-vien.png" },
  { id: "t-4", name: "Nguyễn Bá Thọ", role: "Giáo viên vật lý", image: "/images/anh-giang-vien.png" },
];

const TeachersSection: React.FC = () => {
  return (
    <section aria-labelledby="teachers-heading" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 id="teachers-heading" className="text-center w-full text-2xl sm:text-3xl font-bold text-slate-900">
            Đội ngũ giảng viên
          </h2>
          <div className="ml-auto">
            <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              Xem tất cả <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {TEACHERS.map((t) => (
            <Card key={t.id} className="overflow-hidden rounded-lg shadow-sm">
              <div className="bg-white">
                {/* Portrait-oriented image container */}
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-full w-auto object-cover"
                    loading="lazy"
                    style={{ display: "block" }}
                  />
                </div>

                <CardContent className="pt-4 pb-6 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">{t.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center text-gray-400">
                      <User size={18} />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;