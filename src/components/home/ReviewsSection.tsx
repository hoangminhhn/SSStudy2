"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: string;
  name: string;
  school: string;
  text: string;
  avatar: string;
  rating: number; // e.g., 4.5
}

const reviews: Review[] = [
  {
    id: "r-1",
    name: "Trần Minh Đức",
    school: "THPT Quốc Oai, Hà Nội",
    text:
      "Từ một học sinh trung bình, sau 6 tháng học tại SSStudy, tôi đã tự tin đạt điểm cao trong các kỳ thi. Không chỉ dạy kiến thức, các thầy cô còn truyền cảm hứng và động lực học tập. Tôi rất biết ơn vì đã chọn SSStudy làm nơi đồng hành trên hành trình học tập của mình.",
    avatar: "/images/anh-review-1.png",
    rating: 4.5,
  },
  {
    id: "r-2",
    name: "Lê Thu Trang",
    school: "THPT Quốc Oai, Hà Nội",
    text:
      "SSStudy không chỉ giúp tôi nắm vững kiến thức mà còn dạy tôi cách tư duy và giải quyết vấn đề. Các buổi học luôn sôi động, tương tác và đầy cảm hứng. Tôi cảm thấy mình tiến bộ mỗi ngày và tự tin hơn rất nhiều. Đây thực sự là môi trường học tập lý tưởng cho mọi học sinh.",
    avatar: "/images/Anh-review-2.png",
    rating: 5,
  },
  {
    id: "r-3",
    name: "Phạm Thị Hương",
    school: "THPT Quốc Oai, Hà Nội",
    text:
      "Phương pháp học tập tại SSStudy thực sự khác biệt và hiệu quả. Tôi đặc biệt thích cách giảng dạy sáng tạo và các tài liệu học tập được thiết kế riêng. Nhờ có SSStudy, tôi đã cải thiện được điểm số và hiểu sâu hơn về các môn học khó.",
    avatar: "/images/anh-review-3.png",
    rating: 4.5,
  },
];

const AUTOPLAY_INTERVAL_MS = 5000;

const ReviewsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const count = reviews.length;
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const goTo = (next: number) => {
    setIndex((prev) => {
      const n = (next + count) % count;
      return n;
    });
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay: reset timer on manual nav
  useEffect(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
    }
    autoplayRef.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Pause on hover
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMouseEnter = () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    const handleMouseLeave = () => {
      if (autoplayRef.current) return;
      autoplayRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % count);
      }, AUTOPLAY_INTERVAL_MS);
    };
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [count]);

  return (
    <section aria-labelledby="reviews-heading" className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-10 overflow-visible">
          {/* Centered title + subtitle */}
          <div className="text-center mb-6">
            <h2 id="reviews-heading" className="text-2xl md:text-3xl font-bold text-slate-900">
              Review của học viên tại SSStudy
            </h2>
            <p className="mt-2 text-sm text-slate-500 flex items-center justify-center gap-2">
              <span className="text-yellow-500">🎓</span>
              <span>Hơn 130.000 học viên tin tưởng và theo học tại SSStudy</span>
            </p>
          </div>

          {/* Slider area */}
          <div className="relative" ref={containerRef}>
            {/* Arrows */}
            <button
              aria-label="previous review"
              onClick={() => {
                prev();
                // restart autoplay
                if (autoplayRef.current) {
                  window.clearInterval(autoplayRef.current);
                  autoplayRef.current = window.setInterval(() => setIndex((p) => (p + 1) % count), AUTOPLAY_INTERVAL_MS);
                }
              }}
              className="hidden md:flex items-center justify-center absolute left-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md ring-1 ring-gray-100 z-20"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              aria-label="next review"
              onClick={() => {
                next();
                if (autoplayRef.current) {
                  window.clearInterval(autoplayRef.current);
                  autoplayRef.current = window.setInterval(() => setIndex((p) => (p + 1) % count), AUTOPLAY_INTERVAL_MS);
                }
              }}
              className="hidden md:flex items-center justify-center absolute right-[-18px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md ring-1 ring-gray-100 z-20"
            >
              <ChevronRight size={18} />
            </button>

            {/* Slider viewport */}
            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {reviews.map((r) => (
                  <div key={r.id} className="w-full flex-shrink-0 px-6">
                    <Card className="shadow-lg rounded-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={r.avatar}
                            alt={r.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="font-semibold text-gray-800">{r.name}</div>
                                <div className="text-xs text-gray-500">{r.school}</div>
                              </div>
                              <div className="flex items-center space-x-1">
                                {Array.from({ length: 5 }).map((_, i) => {
                                  const pos = i + 1;
                                  if (r.rating >= pos) {
                                    // full star
                                    return <Star key={i} size={16} className="text-yellow-400" />;
                                  }
                                  if (r.rating >= pos - 0.5) {
                                    // half star approximation: show a full with slightly different color
                                    return <Star key={i} size={16} className="text-yellow-300" />;
                                  }
                                  return <Star key={i} size={16} className="text-gray-200" />;
                                })}
                              </div>
                            </div>

                            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                              {r.text}
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
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile small arrows overlay (visible on small screens) */}
            <div className="flex md:hidden items-center justify-between mt-4 px-2">
              <button
                aria-label="previous mobile"
                onClick={() => prev()}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md ring-1 ring-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center space-x-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`go to review ${i + 1}`}
                    className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
              <button
                aria-label="next mobile"
                onClick={() => next()}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md ring-1 ring-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dots (desktop) */}
            <div className="hidden md:flex items-center justify-center space-x-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`go to review ${i + 1}`}
                  className={`w-2 h-2 rounded-full ${i === index ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;