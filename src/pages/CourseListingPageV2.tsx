"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeacherFilter from "@/components/filters/TeacherFilter";

interface Course {
  id: string;
  title: string;
  teacher: string;
  description: string;
  image: string;
  currentPrice: string;
  oldPrice?: string;
  lessons?: number;
  exercises?: number;
}

const COURSES: Course[] = [
  {
    id: "math-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Khóa: Master HSA - giai đoạn 1 năm học 2025...",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
  {
    id: "physics-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Vật lý 12",
    teacher: "Cô Phạm Thị H",
    description: "Khóa tập trung luyện chuyên sâu giúp nắm vững kỹ năng giải bài.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 25,
    exercises: 20,
  },
  {
    id: "chemistry-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Hóa học 12",
    teacher: "Thầy Lê Văn K",
    description: "Cung cấp kiến thức toàn diện về Hóa học hữu cơ & vô cơ.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 28,
    exercises: 25,
  },
  {
    id: "english-12-s1",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Tiếng Anh 12",
    teacher: "Cô Nguyễn Thị M",
    description: "Nâng cao kỹ năng tiếng Anh cho kỳ thi THPT & quốc tế.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 35,
    exercises: 30,
  },
  {
    id: "math-12-s1-2",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12 (2)",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Phiên bản nâng cao, chuyên sâu giải đề.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
  {
    id: "math-12-s1-3",
    title: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12 (3)",
    teacher: "Thầy Nguyễn Tiến Đạt",
    description: "Bộ đề luyện thi & hướng dẫn chi tiết.",
    image: "/images/20250630150800-ugrw2nuezq.png",
    currentPrice: "2.500.000đ",
    oldPrice: "5.000.000đ",
    lessons: 30,
    exercises: 30,
  },
];

const categories = [
  {
    id: "cat-dgnl",
    title: "Luyện thi DGNL - DGTD",
    items: ["HSA", "APT", "TSA"],
  },
  {
    id: "cat-uni",
    title: "Đại học - Cao đẳng",
    items: ["Toán Cao Cấp", "Vật Lý Đại Cương"],
  },
  {
    id: "cat-12",
    title: "Lớp 12 - Luyện thi ĐH",
    items: ["Toán", "Lý", "Tiếng Anh", "Lịch sử"],
  },
  {
    id: "cat-thcs",
    title: "Luyện thi THCS",
    items: ["Toán", "Văn"],
  },
  {
    id: "cat-10-11",
    title: "Luyện thi 10 - 11",
    items: ["Toán", "Lý"],
  },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState<string | null>("HSA");
  // We'll keep an Accordion open by default for first category
  const [openValue, setOpenValue] = React.useState<string | null>("cat-dgnl");

  // Refs to measure item positions
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicatorStyle, setIndicatorStyle] = React.useState<{ top: number; height: number } | null>(null);

  // Update indicator position when activeItem or layout changes
  React.useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const el = activeItem ? itemRefs.current[activeItem] : null;
      if (!container || !el) {
        setIndicatorStyle(null);
        return;
      }

      // offsetTop relative to the nearest positioned ancestor (containerRef will be relative)
      const relativeTop = (el.offsetTop ?? 0) + (el.offsetHeight ?? 0) / 2 - 20; // center the pill (~40px height)
      const height = Math.max(32, Math.min(48, el.offsetHeight ?? 36));

      setIndicatorStyle({ top: relativeTop, height });
    };

    // measure after paint
    requestAnimationFrame(update);
    // also re-measure on resize/scroll within container
    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeItem, openValue]);

  return (
    <aside className="hidden lg:block w-full max-w-[260px]">
      <div
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-sm p-3 sticky top-20 h-[calc(100vh-5rem)] overflow-auto"
        aria-label="Sidebar danh mục khóa học"
      >
        {/* Blue left indicator: absolutely positioned inside the container */}
        {indicatorStyle && (
          <div
            aria-hidden
            className="absolute -left-2 w-2 rounded-l-full bg-blue-600 transition-all duration-200"
            style={{
              top: indicatorStyle.top,
              height: indicatorStyle.height,
            }}
          />
        )}

        <Accordion type="single" collapsible value={openValue ?? undefined} onValueChange={(v) => setOpenValue(v ?? null)}>
          {categories.map((cat) => (
            <AccordionItem key={cat.id} value={cat.id} className="border-b last:border-b-0">
              <AccordionTrigger className="px-2 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Keep a small visual left area (used only for spacing) */}
                    <div className={cn("mr-2 w-2 h-8 rounded-l-full", cat.items.includes(activeItem || "") ? "bg-blue-600" : "bg-transparent")} />
                    <div
                      className={cn(
                        "text-sm font-medium",
                        cat.items.includes(activeItem || "") ? "text-blue-700" : "text-gray-800"
                      )}
                    >
                      {cat.title}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-2 pb-3 pt-0">
                <ul className="text-sm text-gray-600 space-y-2">
                  {cat.items.map((item) => {
                    const selected = item === activeItem;
                    return (
                      <li key={item}>
                        <button
                          ref={(el) => (itemRefs.current[item] = el)}
                          onClick={() => {
                            setActiveItem(item);
                            setOpenValue(cat.id);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between",
                            selected
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-50 text-gray-700"
                          )}
                          aria-current={selected ? "true" : undefined}
                        >
                          <span className={cn("truncate", selected ? "font-semibold" : "")}>{item}</span>
                          {selected && <span className="ml-2 text-xs opacity-80">✓</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Card className="rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gradient-to-b from-sky-100 to-white p-4 flex items-center justify-center">
        <img src={course.image} alt={course.title} className="w-full h-36 object-cover rounded-lg" />
      </div>
      <CardContent className="p-4">
        <Link to={`/courses-v2/${course.id}`} className="text-blue-600 font-semibold block hover:underline line-clamp-2">
          {course.title}
        </Link>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-gray-500 flex items-center space-x-3">
            <div className="flex items-center">
              <BookOpen size={14} className="mr-1 text-gray-400" />
              <span>{course.lessons ?? 0} bài giảng</span>
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1 text-gray-400" />
              <span>{course.exercises ?? 0} bài tập</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-red-600">{course.currentPrice}</div>
            {course.oldPrice && <div className="text-xs text-gray-400 line-through">{course.oldPrice}</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CourseListingPageV2: React.FC = () => {
  // pagination stub
  const [page, setPage] = React.useState(1);
  const perPage = 6;
  const total = COURSES.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const displayed = COURSES.slice((page - 1) * perPage, page * perPage);

  // Prepare teacher list from courses (unique)
  const teacherList = Array.from(new Set(COURSES.map((c) => c.teacher)));

  const [selectedTeacher, setSelectedTeacher] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Khóa học" bgColor="white" variant="v2" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Filters row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
              <h1 className="text-xl font-semibold text-gray-800">Các Khóa Học (Phiên bản V2)</h1>
              <div className="flex items-center space-x-3">
                <TeacherFilter
                  teachers={teacherList}
                  onSelect={(t) => setSelectedTeacher(t)}
                />
                <select className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm">
                  <option>Giá tiền</option>
                  <option>0 - 500k</option>
                  <option>500k - 2 triệu</option>
                </select>
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed
                .filter((c) => (selectedTeacher ? c.teacher === selectedTeacher : true))
                .map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={cn("px-3 py-1 rounded-md border", page === 1 ? "bg-white text-gray-400 border-gray-200" : "bg-white text-gray-700 border-gray-300")}
                disabled={page === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "px-3 py-1 rounded-md border",
                      page === n ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
                    )}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={cn("px-3 py-1 rounded-md border", page === totalPages ? "bg-white text-gray-400 border-gray-200" : "bg-white text-gray-700 border-gray-300")}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseListingPageV2;