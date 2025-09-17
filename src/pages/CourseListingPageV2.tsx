"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeacherFilter from "@/components/filters/TeacherFilter";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

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
  const [openValue, setOpenValue] = React.useState<string | null>("cat-dgnl");

  // Refs to measure item positions
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicatorStyle, setIndicatorStyle] = React.useState<{ top: number; height: number } | null>(null);

  React.useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const el = activeItem ? itemRefs.current[activeItem] : null;
      if (!container || !el) {
        setIndicatorStyle(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const top = elRect.top - containerRect.top + container.scrollTop;
      const height = Math.max(32, Math.min(48, el.offsetHeight ?? 36));
      const centeredTop = top + (el.offsetHeight / 2) - height / 2;

      setIndicatorStyle({ top: centeredTop, height });
    };

    requestAnimationFrame(update);
    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    const onScroll = () => update();
    containerRef.current?.addEventListener("scroll", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      containerRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [activeItem, openValue]);

  return (
    <aside className="hidden lg:block w-full max-w-[260px]">
      <div
        ref={containerRef}
        className="relative bg-white rounded-lg shadow-sm p-3 sticky top-20 h-[calc(100vh-5rem)] overflow-auto"
        aria-label="Sidebar danh mục khóa học"
      >
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
          {categories.map((cat) => {
            const isOpen = openValue === cat.id;
            return (
              <AccordionItem key={cat.id} value={cat.id} className="border-b last:border-b-0">
                <AccordionTrigger
                  className={cn(
                    "group w-full text-left px-2 py-3 rounded-md transition-colors flex items-center justify-between",
                    isOpen ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-800 hover:bg-blue-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <div className="mr-2 w-2 h-8 rounded-l-full bg-transparent" />
                    <div className={cn("text-sm font-medium", isOpen ? "text-white" : "text-gray-800")}>
                      {cat.title}
                    </div>
                  </div>

                  {/* Accordion has its own chevron UI; keep this span for layout */}
                  <span aria-hidden />
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
                              "w-full text-left px-3 py-2 rounded-md transition-colors",
                              selected ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                            )}
                            aria-current={selected ? "true" : undefined}
                          >
                            <span className="truncate">{item}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
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
  const [page, setPage] = React.useState(1);
  const perPage = 6;
  const total = COURSES.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const displayed = COURSES.slice((page - 1) * perPage, page * perPage);
  const teacherList = Array.from(new Set(COURSES.map((c) => c.teacher)));
  const [selectedTeacher, setSelectedTeacher] = React.useState<string | null>(null);

  // New filter states
  const [selectedClass, setSelectedClass] = React.useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Khóa học" bgColor="white" variant="v2" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Top row: small breadcrumb on the left + filter bar on the right */}
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <nav className="flex items-center gap-2">
              <Link to="/" className="text-gray-500 hover:underline">Trang chủ</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium">Khóa học</span>
            </nav>
          </div>

          <div className="w-full md:w-auto flex items-center space-x-3">
            <div className="text-sm text-gray-600 mr-2 hidden md:block">Lọc theo</div>

            {/* Giảng viên: use the TeacherFilter popover */}
            <div className="w-full md:w-48">
              <TeacherFilter teachers={teacherList} onSelect={(t) => setSelectedTeacher(t)} />
            </div>

            {/* Lớp */}
            <div className="w-full md:w-36">
              <Select onValueChange={(v) => setSelectedClass(v || null)} defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Lớp 10</SelectItem>
                  <SelectItem value="11">Lớp 11</SelectItem>
                  <SelectItem value="12">Lớp 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Giá tiền */}
            <div className="w-full md:w-40">
              <Select onValueChange={(v) => setSelectedPrice(v || null)} defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Giá tiền" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">0 - 500k</SelectItem>
                  <SelectItem value="500-2000">500k - 2 triệu</SelectItem>
                  <SelectItem value="2000+">Trên 2 triệu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phân loại */}
            <div className="w-full md:w-40">
              <Select onValueChange={(v) => setSelectedCategory(v || null)} defaultValue="">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Phân loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Trả phí</SelectItem>
                  <SelectItem value="hot">Khóa nổi bật</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed
            .filter((c) => (selectedTeacher ? c.teacher === selectedTeacher : true))
            .filter((c) => (selectedClass ? true : true)) // placeholder for class filter
            .filter((c) => (selectedPrice ? true : true)) // placeholder for price filter
            .filter((c) => (selectedCategory ? true : true)) // placeholder for category filter
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
      </main>
      <Footer />
    </div>
  );
};

export default CourseListingPageV2;