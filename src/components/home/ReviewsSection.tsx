"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const reviews = [
  {
    id: "r-1",
    name: "Nguyễn Tuấn Anh",
    school: "THPT Quốc Oai, Hà Nội",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere. Curabitur quis nisi est. In egestas nibh in odio rutrum, ut cursus est ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis egestas eros et posuere.",
    avatar: "/images/anh-review-1.png",
    rating: 5,
  },
];

const sideAvatars = [
  "/images/anh-review-1.png",
  "/images/Anh-review-2.png",
  "/images/anh-review-3.png",
  "/images/anh-review-4.png",
];

const ReviewsSection: React.FC = () => {
  return (
    <section aria-labelledby="reviews-heading" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-10 overflow-visible">
          {/* Heading row */}
          <div className="flex items-center justify-between mb-6">
            <div className="max-w-lg">
              <h2
                id="reviews-heading"
                className="text-center md:text-left text-2xl md:text-3xl font-bold text-slate-900"
              >
                Review của học viên tại SSStudy
              </h2>
              <p className="mt-2 text-sm text-slate-500 flex items-center gap-2">
                <span className="text-yellow-500">🎓</span>
                <span>Hơn 130.000 học viên tin tưởng và theo học tại SSStudy</span>
              </p>
            </div>

            <div className="hidden sm:flex items-center">
              <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
                Xem tất cả <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Main content area */}
          <div className="relative flex items-center justify-center py-8">
            {/* Left avatars */}
            <div className="hidden md:flex flex-col items-center space-y-6 absolute left-6 top-1/2 -translate-y-1/2 z-10">
              <img src={sideAvatars[0]} alt="avatar" className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md" />
              <img src={sideAvatars[1]} alt="avatar" className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md" />
            </div>

            {/* Center testimonial card */}
            <div className="w-full max-w-2xl mx-auto px-6">
              <Card className="shadow-lg rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={reviews[0].avatar}
                      alt={reviews[0].name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-gray-800">{reviews[0].name}</div>
                          <div className="text-xs text-gray-500">{reviews[0].school}</div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < reviews[0].rating ? "text-yellow-400" : "text-gray-200"}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                        {reviews[0].text}
                      </p>

                      <div className="mt-4">
                        <Link to="#" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                          Tìm hiểu thêm <span className="ml-2">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination dots */}
              <div className="mt-6 flex items-center justify-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 block" />
                <span className="w-2 h-2 rounded-full bg-gray-300 block" />
                <span className="w-2 h-2 rounded-full bg-gray-300 block" />
                <span className="w-2 h-2 rounded-full bg-gray-300 block" />
              </div>
            </div>

            {/* Right avatars */}
            <div className="hidden md:flex flex-col items-center space-y-6 absolute right-6 top-1/2 -translate-y-1/2 z-10">
              <img src={sideAvatars[2]} alt="avatar" className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md" />
              <img src={sideAvatars[3]} alt="avatar" className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;