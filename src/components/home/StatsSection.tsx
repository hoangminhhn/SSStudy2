"use client";

import React from "react";

const stats = [
  { value: "186000+", label: "Học viên" },
  { value: "10 năm", label: "Kinh nghiệm luyện thi" },
  { value: "454+", label: "Thủ khoa, Á khoa" },
  { value: "50+", label: "Đầu sách luyện thi" },
];

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 leading-tight">
        {value}
      </div>
      <div className="mt-2 text-sm sm:text-base text-gray-600 text-center">
        {label}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section
      aria-label="Key statistics"
      className="bg-white py-8 sm:py-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-8 items-center text-center">
            {stats.map((s) => (
              <StatItem key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;