"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { Star, Download, BookOpen } from "lucide-react";

type Doc = {
  id: string;
  title: string;
  subject: string;
  course?: string | null;
  summary?: string;
  free: boolean;
  url?: string;
};

const FREE_DOCS: Doc[] = [
  {
    id: "f-1",
    title: "Tổng hợp công thức lượng giác",
    subject: "Toán",
    summary: "Tóm tắt các công thức lượng giác thường gặp, dạng bài và mẹo giải.",
    free: true,
    url: "/docs/tong-hop-luong-giac.pdf",
  },
  {
    id: "f-2",
    title: "Bảng công thức đạo hàm nguyên hàm",
    subject: "Toán",
    summary: "Các công thức nguyên hàm, đạo hàm cơ bản dùng cho luyện thi.",
    free: true,
    url: "/docs/bang-cong-thuc-deriv.pdf",
  },
  {
    id: "f-3",
    title: "Words to know - Phrasal verbs cơ bản",
    subject: "Anh",
    summary: "Tập hợp các phrasal verbs phổ biến trong phần đọc và viết.",
    free: true,
    url: "/docs/phrasal-verbs.pdf",
  },
];

const ALL_DOCS: Doc[] = [
  ...FREE_DOCS,
  // course-specific docs (require purchase)
  {
    id: "c-math-1",
    title: "Bộ đề chuyên đề Toán - Buổi 1",
    subject: "Toán",
    course: "Master HSA - Toán 12",
    summary: "Bộ đề buổi 1 kèm lời giải chi tiết.",
    free: false,
    url: "/docs/master-hsa-buoi-1.pdf",
  },
  {
    id: "c-math-2",
    title: "Tổng hợp bài tập PT, BPT",
    subject: "Toán",
    course: "Master HSA - Toán 12",
    summary: "Bài tập luyện tập và hướng dẫn nhanh.",
    free: false,
    url: "/docs/pt-bpt.pdf",
  },
  {
    id: "c-physics-1",
    title: "Bài tập Vật lý - Điện xoay chiều",
    subject: "Lý",
    course: "Vật lý chuyên sâu",
    summary: "Bài tập theo chủ đề và đáp án chi tiết.",
    free: false,
    url: "/docs/dien-xoay-chieu.pdf",
  },
];

const DEMO_USER_COURSES = [
  { id: "course-1", title: "Master HSA - Toán 12" },
  { id: "course-2", title: "Vật lý chuyên sâu" },
];

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [onlyRecent, setOnlyRecent] = useState(false);

  // Simulated auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCourses] = useState(DEMO_USER_COURSES);

  // Favorites persisted
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Recent accessed (simple list of doc ids)
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const rawFav = localStorage.getItem("docs_favorites");
    if (rawFav) {
      try {
        setFavorites(JSON.parse(rawFav));
      } catch {
        setFavorites({});
      }
    }
    const rawRecent = localStorage.getItem("docs_recent");
    if (rawRecent) {
      try {
        setRecent(JSON.parse(rawRecent));
      } catch {
        setRecent([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("docs_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("docs_recent", JSON.stringify(recent.slice(0, 20)));
  }, [recent]);

  const subjects = useMemo(() => {
    const s = Array.from(new Set(ALL_DOCS.map((d) => d.subject)));
    return ["all", ...s];
  }, []);

  const courses = useMemo(() => {
    const c = Array.from(new Set(ALL_DOCS.map((d) => d.course).filter(Boolean) as string[]));
    return ["all", ...c];
  }, []);

  const handleToggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showSuccess(next[id] ? "Đã thêm vào yêu thích" : "Đã gỡ yêu thích");
      return next;
    });
  };

  const handleView = (doc: Doc) => {
    // record recent
    setRecent((prev) => [doc.id, ...prev.filter((x) => x !== doc.id)].slice(0, 20));
    showSuccess("Mở tài liệu (mô phỏng)");
    // In a real app we'd open doc.url; for demo, open in new tab if url present
    if (doc.url) {
      // For demo, navigate to the url if present (it might be an internal path)
      window.open(doc.url, "_blank");
    }
  };

  const freeDocs = useMemo(() => {
    return ALL_DOCS.filter((d) => d.free);
  }, []);

  const purchasedDocs = useMemo(() => {
    if (!isLoggedIn) return [];
    // docs where course is in userCourses
    const myCourseTitles = userCourses.map((c) => c.title);
    return ALL_DOCS.filter((d) => d.course && myCourseTitles.includes(d.course));
  }, [isLoggedIn, userCourses]);

  const filteredFree = useMemo(() => {
    let list = freeDocs;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((d) => (d.title + " " + (d.summary ?? "") + " " + (d.course ?? "")).toLowerCase().includes(q));
    }
    if (subjectFilter !== "all") list = list.filter((d) => d.subject === subjectFilter);
    if (courseFilter !== "all") list = list.filter((d) => d.course === courseFilter);
    if (onlyRecent) list = list.filter((d) => recent.includes(d.id));
    return list;
  }, [freeDocs, query, subjectFilter, courseFilter, onlyRecent, recent]);

  const filteredPurchased = useMemo(() => {
    let list = purchasedDocs;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((d) => (d.title + " " + (d.summary ?? "") + " " + (d.course ?? "")).toLowerCase().includes(q));
    }
    if (subjectFilter !== "all") list = list.filter((d) => d.subject === subjectFilter);
    if (courseFilter !== "all") list = list.filter((d) => d.course === courseFilter);
    if (onlyRecent) list = list.filter((d) => recent.includes(d.id));
    return list;
  }, [purchasedDocs, query, subjectFilter, courseFilter, onlyRecent, recent]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Tài liệu" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: main */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Tìm tài liệu theo tên, chủ đề, khóa..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
                >
                  {subjects.map((s) => (
                    <option value={s} key={s}>
                      {s === "all" ? "Tất cả môn" : s}
                    </option>
                  ))}
                </select>

                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-2 bg-white text-sm"
                >
                  {courses.map((c) => (
                    <option value={c} key={c}>
                      {c === "all" ? "Tất cả khóa" : c}
                    </option>
                  ))}
                </select>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={onlyRecent} onChange={(e) => setOnlyRecent(e.target.checked)} />
                  Gần đây
                </label>
              </div>
            </div>

            {/* Suggested / Free documents */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tài liệu miễn phí</h2>
                <div className="text-sm text-gray-500">Có thể truy cập công khai</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFree.length === 0 ? (
                  <div className="text-gray-500 p-6 bg-white rounded-md">Không tìm thấy tài liệu miễn phí phù hợp.</div>
                ) : (
                  filteredFree.map((doc) => (
                    <Card key={doc.id} className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
                          <BookOpen />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                              <div className="text-xs text-gray-500 mt-1">{doc.subject} {doc.course ? `• ${doc.course}` : ""}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <button
                                aria-label="Yêu thích"
                                onClick={() => handleToggleFav(doc.id)}
                                className="text-yellow-500 hover:text-yellow-600"
                              >
                                <Star className={favorites[doc.id] ? "text-yellow-400" : "text-gray-300"} />
                              </button>
                              <span className="text-xs text-gray-400">{favorites[doc.id] ? "Đã yêu thích" : ""}</span>
                            </div>
                          </div>

                          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{doc.summary}</p>

                          <div className="mt-4 flex items-center gap-3">
                            <Button size="sm" onClick={() => handleView(doc)}>
                              Xem <Download size={14} className="ml-2" />
                            </Button>
                            <Badge variant="secondary" className="bg-green-50 text-green-700">{doc.free ? "Miễn phí" : "Khóa"}</Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </section>

            {/* User-specific docs */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tài liệu cho học viên</h2>
                <div className="text-sm text-gray-500">Tài liệu theo khóa bạn đã học</div>
              </div>

              {!isLoggedIn ? (
                <Card className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">Đăng nhập để xem tài liệu thuộc các khóa bạn đã mua.</p>
                      <p className="text-sm text-gray-500">Nếu chưa có tài khoản, bạn có thể đăng ký hoặc sử dụng nút mô phỏng để xem demo.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setIsLoggedIn(true)}>Mô phỏng đăng nhập</Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {userCourses.map((c) => (
                      <Badge key={c.id} className="bg-blue-50 text-blue-700" variant="secondary">
                        {c.title}
                      </Badge>
                    ))}
                    <div className="ml-auto text-sm text-gray-500">Bạn có {purchasedDocs.length} tài liệu</div>
                  </div>

                  {filteredPurchased.length === 0 ? (
                    <Card className="p-6">Không có tài liệu nào cho các khóa đã chọn / bộ lọc của bạn.</Card>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredPurchased.map((doc) => (
                        <Card key={doc.id} className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-md bg-purple-50 flex items-center justify-center text-purple-600">
                              <BookOpen />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                                  <div className="text-xs text-gray-500 mt-1">{doc.subject} • {doc.course}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <button onClick={() => handleToggleFav(doc.id)} className="text-yellow-500 hover:text-yellow-600">
                                    <Star className={favorites[doc.id] ? "text-yellow-400" : "text-gray-300"} />
                                  </button>
                                </div>
                              </div>

                              <p className="mt-3 text-sm text-gray-600 line-clamp-2">{doc.summary}</p>

                              <div className="mt-4 flex items-center gap-3">
                                <Button size="sm" onClick={() => handleView(doc)}>
                                  Mở tài liệu <Download size={14} className="ml-2" />
                                </Button>
                                <Badge className="bg-violet-50 text-violet-700">Khóa của bạn</Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Right: sidebar / utilities */}
          <aside className="space-y-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Tiện ích</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <strong>Yêu thích:</strong> {Object.keys(favorites).filter((k) => favorites[k]).length}
                </div>
                <div>
                  <strong>Gợi ý theo môn:</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Toán", "Lý", "Anh"].map((s) => (
                      <button
                        key={s}
                        className="text-xs bg-gray-100 px-2 py-1 rounded-md"
                        onClick={() => {
                          setSubjectFilter(s);
                          showSuccess(`Hiển thị gợi ý môn ${s}`);
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Lọc nhanh theo khóa:</strong>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {courses.filter((c) => c !== "all").slice(0, 4).map((c) => (
                      <button key={c} className="text-xs bg-gray-100 px-2 py-1 rounded-md" onClick={() => setCourseFilter(c)}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Gần đây truy cập</h4>
              {recent.length === 0 ? (
                <div className="text-sm text-gray-500">Chưa có lịch sử truy cập.</div>
              ) : (
                <ul className="space-y-2 text-sm">
                  {recent.map((id) => {
                    const doc = ALL_DOCS.find((d) => d.id === id);
                    if (!doc) return null;
                    return (
                      <li key={id} className="flex items-center justify-between">
                        <div className="truncate">{doc.title}</div>
                        <Button variant="ghost" size="sm" onClick={() => handleView(doc)}>
                          Mở
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}