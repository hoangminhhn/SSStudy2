"use client";

import React from "react";
import { Link } from "react-router-dom";

const demoCards = [
  {
    id: "s-1",
    title: "Quy mô",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anh-lich-su.png",
  },
  {
    id: "s-2",
    title: "Trung tâm luyện thi",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anhdoitac1.png",
  },
  {
    id: "s-3",
    title: "Nền tảng thi trực tuyến",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anhdoitac2.png",
  },
];

const SSStudySection: React.FC = () => {
  // For demo we will repeat the three cards to create 6 visible cards (2 rows)
  const cards = [...demoCards, ...demoCards];

  return (
    <section aria-labelledby="ssstudy-heading" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 id="ssstudy-heading" className="text-center text-2xl font-bold text-slate-900 mb-8">
          SSStudy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => (
            <div key={`${c.id}-${idx}`} className="relative rounded-lg overflow-hidden shadow-md bg-white">
              {/* Image background — increased heights for better visual */}
              <div className="w-full h-52 sm:h-56 lg:h-60 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Floating white card */}
              <div className="px-4 pb-6 pt-4">
                <div className="relative -mt-8">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-800">{c.title}</h4>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-3">{c.desc}</p>
                    <div className="mt-3">
                      <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                        Tìm hiểu thêm
                        <svg className="ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* subtle border shadow to mimic stacked card (optional) */}
                  <div className="absolute -bottom-2 left-4 right-4 h-0.5 bg-gray-100 rounded opacity-80" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (visual only for demo) */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button className="text-sm px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100">‹</button>
          <button className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white">1</button>
          <button className="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100">2</button>
          <button className="text-sm px-3 py-1 rounded-md text-gray-600 hover:bg-gray-100">3</button>
          <button className="text-sm px-3 py-1 rounded-md text-gray-500 hover:bg-gray-100">›</button>
        </div>
      </div>
    </section>
  );
};

export default SSStudySection;