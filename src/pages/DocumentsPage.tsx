"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { Star, Download, BookOpen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ALL_DOCS, FREE_DOCS, DEMO_USER_COURSES } from "@/data/docsData";
import { useNavigate, Link } from "react-router-dom";

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [onlyRecent, setOnlyRecent] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  // Simulated auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCourses] = useState(DEMO_USER_COURSES);

  // persistent states
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [recent, setRecent] = useState<string[]>([]);

  // UI helpers
  const purchasedRef = useRef<HTMLDivElement | null>(null);
  const [isMyDocsOpen, setIsMyDocsOpen] = useState(false); // mobile sheet
  const [activeTab, setActiveTab] = useState<string>("free"); // 'free' | 'my'

  const navigate = useNavigate();

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

  // If user logs in/out we may switch default tab
  useEffect(() => {
    if (isLoggedIn) {
      setActiveTab("my");
    } else {
      setActiveTab("free");
    }
  }, [isLoggedIn]);

  const subjects = useMemo(() => ["all", ...Array.from(new Set(ALL_DOCS.map((d) => d.subject)))], []);
  const categories = useMemo(() => ["all", ...Array.from(new Set(ALL_DOCS.map((d) => d.category).filter(Boolean) as string[]))], []);
  const grades = useMemo(() => ["all", ...Array.from(new Set(ALL_DOCS.map((d) => d.grade).filter(Boolean) as string[]))], []);
  const courses = useMemo(() => ["all", ...Array.from(new Set(ALL_DOCS.map((d) => d.course).filter(Boolean) as string[]))], []);

  const freeDocs = useMemo(() => FREE_DOCS, []);
  const purchasedDocs = useMemo(() => {
    if (!isLoggedIn) return [];
    const myCourseTitles = userCourses.map((c) => c.title);
    return ALL_DOCS.filter((d) => d.course && myCourseTitles.includes(d.course));
  }, [isLoggedIn, userCourses]);

  const applyFilters = (list: typeof ALL_DOCS) => {
    let result = list;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter((d) => (d.title + " " + (d.summary ?? "") + " " + (d.course ?? "")).toLowerCase().includes(q));
    }
    if (subjectFilter !== "all") result = result.filter((d) => d.subject === subjectFilter);
    if (courseFilter !== "all") result = result.filter((d) => d.course === courseFilter);
    if (onlyRecent) result = result.filter((d) => recent.includes(d.id));
    if (categoryFilter !== "all") result = result.filter((d) => d.category === categoryFilter);
    if (gradeFilter !== "all") result = result.filter((d) => d.grade === gradeFilter);
    return result;
  };

  const filteredFree = useMemo(() => applyFilters(freeDocs as any), [freeDocs, query, subjectFilter, courseFilter, onlyRecent, categoryFilter, gradeFilter, recent]);
  const filteredPurchased = useMemo(() => applyFilters(purchasedDocs as any), [purchasedDocs, query, subjectFilter, courseFilter, onlyRecent, categoryFilter, gradeFilter, recent]);

  const handleToggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showSuccess(next[id] ? "Đã thêm vào yêu thích" : "Đã gỡ yêu thích");
      return next;
    });
  };

  const viewDetail = (docId: string) => {
    // add to recent and navigate to detail page
    setRecent((prev) => [docId, ...prev.filter((x) => x !== docId)].slice(0, 20));
    navigate(`/tai-lieu/${docId}`);
  };

  const jumpToMyDocs = () => {
    // switch to 'my' tab then scroll (desktop) or open sheet (mobile)
    setActiveTab("my");
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 768) {
      // small delay to allow tab content to render then scroll
      setTimeout(() => purchasedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
    } else {
      setIsMyDocsOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Tài liệu" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4 gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm tài liệu theo tên, chủ đề, khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={jumpToMyDocs} className="hidden md:inline-flex">
              Tài liệu của tôi
            </Button>

            <button
              onClick={() => setIsMyDocsOpen(true)}
              className="md:hidden inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-full shadow"
              aria-label="Tài liệu của tôi"
              title="Tài liệu của tôi"
            >
              Tài liệu của tôi
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-2 mb-6">
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="border px-3 py-2 rounded bg-white text-sm">
            {subjects.map((s) => (<option key={s} value={s}>{s === "all" ? "Tất cả môn" : s}</option>))}
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border px-3 py-2 rounded bg-white text-sm">
            {categories.map((c) => (<option key={c} value={c}>{c === "all" ? "Tất cả danh mục" : c}</option>))}
          </select>

          <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="border px-3 py-2 rounded bg-white text-sm">
            {grades.map((g) => (<option key={g} value={g}>{g === "all" ? "Tất cả cấp học" : g}</option>))}
          </select>

          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="border px-3 py-2 rounded bg-white text-sm">
            {courses.map((c) => (<option key={c} value={c}>{c === "all" ? "Tất cả khóa" : c}</option>))}
          </select>

          <label className="inline-flex items-center gap-2 text-sm ml-2">
            <input type="checkbox" checked={onlyRecent} onChange={(e) => setOnlyRecent(e.target.checked)} />
            Gần đây
          </label>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v)}>
          <TabsList className="mb-6">
            <TabsTrigger value="free">Tài liệu miễn phí</TabsTrigger>
            <TabsTrigger value="my">Tài liệu của tôi</TabsTrigger>
          </TabsList>

          {/* Free tab */}
          <TabsContent value="free">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                {filteredFree.length === 0 ? (
                  <Card className="p-6">Không tìm thấy tài liệu miễn phí phù hợp.</Card>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredFree.map((doc) => (
                      <Card key={doc.id} className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-600">
                            <BookOpen />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  <Link to={`/tai-lieu/${doc.id}`} onClick={() => viewDetail(doc.id)} className="hover:underline">
                                    {doc.title}
                                  </Link>
                                </h3>
                                <div className="text-xs text-gray-500 mt-1">
                                  {doc.subject} {doc.course ? `• ${doc.course}` : ""} {doc.grade ? `• ${doc.grade}` : ""} {doc.category ? `• ${doc.category}` : ""}
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <button aria-label="Yêu thích" onClick={() => handleToggleFav(doc.id)} className="text-yellow-500 hover:text-yellow-600">
                                  <Star className={favorites[doc.id] ? "text-yellow-400" : "text-gray-300"} />
                                </button>
                              </div>
                            </div>

                            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{doc.summary}</p>

                            <div className="mt-4 flex items-center gap-3">
                              <button onClick={() => viewDetail(doc.id)}>
                                <Button size="sm">Xem chi tiết</Button>
                              </button>
                              <Badge variant="secondary" className="bg-green-50 text-green-700">{doc.free ? "Miễn phí" : "Khóa"}</Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Right utilities column */}
              <aside className="space-y-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Tiện ích</h4>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div><strong>Yêu thích:</strong> {Object.keys(favorites).filter((k) => favorites[k]).length}</div>
                    <div>
                      <strong>Gợi ý theo môn:</strong>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Toán", "Lý", "Anh"].map((s) => (
                          <button key={s} className="text-xs bg-gray-100 px-2 py-1 rounded-md" onClick={() => { setSubjectFilter(s); showSuccess(`Hiển thị ${s}`); }}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Lọc nhanh theo khóa:</strong>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {courses.filter((c) => c !== "all").slice(0, 4).map((c) => (
                          <button key={c} className="text-xs bg-gray-100 px-2 py-1 rounded-md" onClick={() => setCourseFilter(c)}>{c}</button>
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
                            <Button variant="ghost" size="sm" onClick={() => viewDetail(doc.id)}>Xem</Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Card>
              </aside>
            </div>
          </TabsContent>

          {/* My docs tab */}
          <TabsContent value="my">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                {!isLoggedIn ? (
                  <Card className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">Đăng nhập để xem tài liệu thuộc các khóa bạn đã mua.</p>
                        <p className="text-sm text-gray-500">Dùng nút mô phỏng để thử trải nghiệm.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => setIsLoggedIn(true)}>Mô phỏng đăng nhập</Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <>
                    <div ref={purchasedRef}>
                      <div className="flex items-center gap-3 mb-2">
                        {userCourses.map((c) => (
                          <Badge key={c.id} className="bg-blue-50 text-blue-700">{c.title}</Badge>
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
                                      <h3 className="font-semibold text-gray-800">
                                        <Link to={`/tai-lieu/${doc.id}`} onClick={() => viewDetail(doc.id)} className="hover:underline">
                                          {doc.title}
                                        </Link>
                                      </h3>
                                      <div className="text-xs text-gray-500 mt-1">
                                        {doc.subject} • {doc.course} {doc.grade ? `• ${doc.grade}` : ""} {doc.category ? `• ${doc.category}` : ""}
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <button onClick={() => handleToggleFav(doc.id)} className="text-yellow-500 hover:text-yellow-600">
                                        <Star className={favorites[doc.id] ? "text-yellow-400" : "text-gray-300"} />
                                      </button>
                                    </div>
                                  </div>

                                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">{doc.summary}</p>

                                  <div className="mt-4 flex items-center gap-3">
                                    <button onClick={() => viewDetail(doc.id)}>
                                      <Button size="sm">Xem chi tiết</Button>
                                    </button>
                                    <Badge className="bg-violet-50 text-violet-700">Khóa của bạn</Badge>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <aside className="space-y-6">
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
                            <Button variant="ghost" size="sm" onClick={() => viewDetail(doc.id)}>Xem</Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Card>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Mobile Sheet: My Documents quick access */}
      <Sheet open={isMyDocsOpen} onOpenChange={setIsMyDocsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>Tài liệu của tôi</SheetTitle>
              <SheetClose asChild>
                <button aria-label="Đóng" className="text-gray-600 hover:text-gray-800">Đóng</button>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="p-4 space-y-4">
            {!isLoggedIn ? (
              <div>
                <div className="text-sm text-gray-700 mb-3">Bạn chưa đăng nhập</div>
                <Button onClick={() => { setIsLoggedIn(true); setIsMyDocsOpen(false); }}>Mô phỏng đăng nhập</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {userCourses.map((c) => {
                  const docsForCourse = ALL_DOCS.filter((d) => d.course === c.title);
                  return (
                    <div key={c.id} className="border rounded p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{c.title}</div>
                        <div className="text-xs text-gray-500">{docsForCourse.length} tài liệu</div>
                      </div>
                      <div className="mt-2 space-y-2">
                        {docsForCourse.map((d) => (
                          <div key={d.id} className="flex items-center justify-between">
                            <div className="text-sm truncate">{d.title}</div>
                            <button onClick={() => { viewDetail(d.id); setIsMyDocsOpen(false); }} className="text-sm text-blue-600">Mở</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}