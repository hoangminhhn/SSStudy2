"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, User, Filter as FilterIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TeacherFilter from "@/components/filters/TeacherFilter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

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
                              "w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between",
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
  const [selectedClass, setSelectedClass] = React.useState<string | null>(null); // "Lớp 1" ... "Lớp 12"
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null); // phân loại

  // Mobile sheet states
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);

  const clearFilters = () => {
    setSelectedTeacher(null);
    setSelectedClass(null);
    setSelectedCategory(null);
  };

  // Render short summary tags for mobile to show active filters
  const ActiveFilterTags: React.FC = () => {
    const tags: string[] = [];
    if (selectedTeacher) tags.push(selectedTeacher);
    if (selectedClass) tags.push(selectedClass);
    if (selectedCategory) {
      if (selectedCategory === "khuyen-mai") tags.push("Đang khuyến mại");
      if (selectedCategory === "nhieu-hoc-vien") tags.push("Nhiều học viên nhất");
      if (selectedCategory === "khoa-hoc-hot") tags.push("Khóa học hot");
    }
    if (tags.length === 0) {
      // When no filter active, show button to open categories (sidebar)
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCategoryOpen(true)}
            className="text-sm bg-white border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
            aria-label="Mở danh mục"
          >
            Danh mục
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 overflow-auto">
        {tags.map((t) => (
          <div key={t} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full whitespace-nowrap">
            {t}
          </div>
        ))}
        <button onClick={clearFilters} className="ml-2 text-xs text-red-600 underline">
          Xoá
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Khóa học" bgColor="white" variant="v2" />
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          <div className="lg:col-span-9">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-xl font-semibold text-gray-800">Các Khóa Học (Phiên bản V2)</h1>

              {/* Desktop controls */}
              <div className="hidden md:flex items-center space-x-3">
                <TeacherFilter teachers={teacherList} onSelect={(t) => setSelectedTeacher(t)} />

                <select
                  id="class-select"
                  value={selectedClass ?? ""}
                  onChange={(e) => setSelectedClass(e.target.value || null)}
                  className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
                >
                  <option value="">Lớp</option>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={`Lớp ${i + 1}`}>Lớp {i + 1}</option>
                  ))}
                </select>

                <select className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm">
                  <option>Giá tiền</option>
                  <option>0 - 500k</option>
                  <option>500k - 2 triệu</option>
                </select>

                <select
                  id="category-select"
                  value={selectedCategory ?? ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
                >
                  <option value="">Phân loại</option>
                  <option value="khuyen-mai">Đang khuyến mại</option>
                  <option value="nhieu-hoc-vien">Nhiều học viên nhất</option>
                  <option value="khoa-hoc-hot">Khóa học hot</option>
                </select>
              </div>

              {/* Mobile: filter button + active tags */}
              <div className="flex items-center gap-2 w-full md:hidden">
                <div className="flex-1">
                  <ActiveFilterTags />
                </div>
                <Button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 rounded-full px-3 py-2"
                >
                  <FilterIcon size={16} />
                  Bộ lọc
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed
                .filter((c) => (selectedTeacher ? c.teacher === selectedTeacher : true))
                .map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center space-x-2">
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

      {/* Mobile Sheet for filters */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Bộ lọc</SheetTitle>
              <SheetClose asChild>
                <button aria-label="Đóng bộ lọc" className="text-gray-600 hover:text-gray-800">
                  <X />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="p-4 space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Giảng viên</div>
              <TeacherFilter teachers={teacherList} onSelect={(t) => setSelectedTeacher(t)} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Lớp</label>
              <select
                id="mobile-class-select"
                value={selectedClass ?? ""}
                onChange={(e) => setSelectedClass(e.target.value || null)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
              >
                <option value="">Lớp</option>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={`Lớp ${i + 1}`}>Lớp {i + 1}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Giá tiền</label>
              <select className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-sm">
                <option>Giá tiền</option>
                <option>0 - 500k</option>
                <option>500k - 2 triệu</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phân loại</label>
              <select
                id="mobile-category-select"
                value={selectedCategory ?? ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
              >
                <option value="">Phân loại</option>
                <option value="khuyen-mai">Đang khuyến mại</option>
                <option value="nhieu-hoc-vien">Nhiều học viên nhất</option>
                <option value="khoa-hoc-hot">Khóa học hot</option>
              </select>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={clearFilters}>
                Xoá
              </Button>
              <SheetClose asChild>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Áp dụng</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Sheet for categories (left side) */}
      <Sheet open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
        <SheetContent side="left" className="w-full sm:max-w-sm">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Danh mục</SheetTitle>
              <SheetClose asChild>
                <button aria-label="Đóng danh mục" className="text-gray-600 hover:text-gray-800">
                  <X />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="p-4">
            {/* Reuse Sidebar content inside the Sheet for mobile */}
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CourseListingPageV2;