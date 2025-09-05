"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface PartnerItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const PARTNERS: PartnerItem[] = [
  {
    id: "pt-1",
    title: "Phương pháp giúp em nhớ được 90% kiến thức đã đọc",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "05/08/2025",
    image: "/images/anhdoitac1.png",
  },
  {
    id: "pt-2",
    title: "Lịch ôn thi cuối kì 2 toán 11",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "05/08/2025",
    image: "/images/anhdoitac2.png",
  },
  {
    id: "pt-3",
    title: "Các hãng đăng thức đáng nhớ",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "05/08/2025",
    image: "/images/anhdoitac3.png",
  },
];

const PartnersSection: React.FC = () => {
  return (
    <section aria-labelledby="partners-heading" className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 id="partners-heading" className="text-2xl md:text-3xl font-bold text-slate-900 text-center w-full">
            Đối tác
          </h2>
          <div className="ml-auto">
            <Link to="/partners" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              Xem tất cả <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((p) => (
            <Card key={p.id} className="shadow-md rounded-lg overflow-hidden">
              {/* Increased image height: h-56 on small screens, h-64 on md+ */}
              <div className="w-full h-56 md:h-64 bg-gray-100 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-base font-semibold text-slate-900 line-clamp-2">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-6 pt-2">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{p.excerpt}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <CalendarDays size={14} className="mr-2" />
                  <span>{p.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;