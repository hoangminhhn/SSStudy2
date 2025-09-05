"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

/**
 * NewsEventsSection
 * - Left: Featured article with overlay title + date, thumbnail strip underneath
 * - Right: Tabs (Tin tức / Sự kiện) with list items (thumbnail, title, date)
 *
 * Uses images from public/images:
 *  - /images/anh-tin-tuc-1.png
 *  - /images/anh-tin-tuc-2.png
 *  - /images/anh-tin-tuc-3.png
 *  - /images/anh-tin-tuc-4.png
 */

const posts = [
  {
    id: "n-1",
    title: "Thêm trường Sư phạm tổ chức kỳ thi",
    date: "05/08/2025",
    image: "/images/anh-tin-tuc-1.png",
  },
  {
    id: "n-2",
    title: "Nam sinh đạt IELTS 8.5, SAT top 1%",
    date: "04/08/2025",
    image: "/images/anh-tin-tuc-2.png",
  },
  {
    id: "n-3",
    title: "Hội thảo giáo dục sáng tạo 2025",
    date: "01/08/2025",
    image: "/images/anh-tin-tuc-3.png",
  },
  {
    id: "n-4",
    title: "SSStudy đồng hành cùng kỳ thi thử",
    date: "28/07/2025",
    image: "/images/anh-tin-tuc-4.png",
  },
];

const NewsEventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"news" | "events">("news");

  // For demo we'll reuse same posts for both tabs (in real app these would differ)
  const listItems = activeTab === "news" ? posts : posts.slice().reverse();

  return (
    <section aria-labelledby="news-events-heading" className="py-12">
      <div className="container mx-auto px-4">
        <h2
          id="news-events-heading"
          className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8"
        >
          Tin tức và sự kiện
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Featured + thumbnails (span 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-transparent">
              <div className="relative">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                <div className="absolute left-6 bottom-6 right-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-white">
                    <div className="text-sm flex items-center gap-2 text-gray-100/90 mb-2">
                      <CalendarDays size={14} />
                      <span className="text-xs">{posts[0].date}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold leading-tight max-w-xl">
                      {posts[0].title}
                    </h3>
                  </div>
                </div>
              </div>
            </Card>

            {/* Thumbnail strip */}
            <div className="mt-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
              {posts.map((p) => (
                <button
                  key={p.id}
                  className="flex-shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-md overflow-hidden shadow-sm border border-gray-100"
                  aria-label={p.title}
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Tabs with list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center border-b pb-3 mb-3">
                <button
                  onClick={() => setActiveTab("news")}
                  className={`px-3 py-2 text-sm font-medium ${activeTab === "news" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                >
                  Tin tức
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`ml-4 px-3 py-2 text-sm font-medium ${activeTab === "events" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
                >
                  Sự kiện
                </button>
              </div>

              <div className="space-y-4">
                {listItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-md p-3">
                    <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-md flex-shrink-0" />
                    <div className="flex-1">
                      <Link to={`/news/${item.id}`} className="block text-sm font-medium text-slate-800 hover:text-blue-600">
                        {item.title}
                      </Link>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <CalendarDays size={12} />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link to="/news" className="text-sm text-blue-600 hover:underline">
                  Xem tất cả tin tức
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;