"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

type Item = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
};

const ITEMS: Item[] = [
  {
    id: "s-1",
    title: "Quy mô",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anh-lich-su.png",
  },
  {
    id: "s-2",
    title: "Trung tâm luyện thi",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anhdoitac1.png",
  },
  {
    id: "s-3",
    title: "Nền tảng thi trực tuyến",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anh-lich-su.png",
  },
  {
    id: "s-4",
    title: "Quy mô",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anh-lich-su.png",
  },
  {
    id: "s-5",
    title: "Trung tâm luyện thi",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anhdoitac1.png",
  },
  {
    id: "s-6",
    title: "Nền tảng thi trực tuyến",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    image: "/images/anh-lich-su.png",
  },
];

const SSStudySection: React.FC = () => {
  return (
    <section aria-labelledby="ssstudy-heading" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 id="ssstudy-heading" className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          SSStudy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ITEMS.map((item) => (
            <Card key={item.id} className="overflow-hidden relative group">
              {/* Image area */}
              <div className="w-full h-52 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Floating info box */}
              <div className="absolute left-6 right-6 -translate-y-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3">{item.excerpt}</p>
                  <div className="mt-4">
                    <Link to="#" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                      Tìm hiểu thêm
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination (visual only) */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full">‹</button>
          <button className="px-3 py-1 rounded-md bg-white border text-sm">1</button>
          <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">2</button>
          <button className="px-3 py-1 rounded-md bg-white border text-sm">...</button>
          <button className="px-3 py-1 rounded-md bg-white border text-sm">8</button>
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full">›</button>
        </div>
      </div>
    </section>
  );
};

export default SSStudySection;