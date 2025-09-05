"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const parents = [
  { id: "p-1", name: "Đặng Thu Thảo", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
  { id: "p-2", name: "Nguyễn Hòa", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
  { id: "p-3", name: "Phạm Thùy Trang", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
  { id: "p-4", name: "Văn Ân", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
  { id: "p-5", name: "Ngọc Thụy", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
  { id: "p-6", name: "Bằng", place: "Cầu Giấy, Hà Nội", image: "/images/anh-phu-huynh.png" },
];

const ParentsFeedbackSection: React.FC = () => {
  return (
    <section aria-labelledby="parents-feedback-heading" className="py-12">
      <div className="container mx-auto px-4">
        <h2
          id="parents-feedback-heading"
          className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8"
        >
          Phản hồi của phụ huynh
        </h2>

        <div className="relative bg-gradient-to-b from-white to-blue-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parents.map((p, idx) => (
              <div key={p.id} className="relative">
                {/* orange notch */}
                <span
                  aria-hidden
                  className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full shadow-md"
                />
                <Card className="shadow-sm overflow-visible">
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.place}</div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis
                      egestas eros et posuere. Curabitur quis nisi est. In egestas nibh in odio
                      rutrum, ut cursus est ultrices.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentsFeedbackSection;