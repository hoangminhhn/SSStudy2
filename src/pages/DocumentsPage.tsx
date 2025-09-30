"use client";

import React, { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import DocumentCard, { DocumentItem } from "@/components/documents/DocumentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";
import { Link } from "react-router-dom";

const SAMPLE_DOCUMENTS: DocumentItem[] = [
  {
    id: "d-1",
    title: "Bộ đề luyện Toán - Chương 1 (PDF)",
    excerpt: "Tập hợp các đề luyện chi tiết chương 1, phù hợp lớp 12.",
    isFree: true,
    courseId: null,
    filename: "toan-chuong-1.pdf",
  },
  {
    id: "d-2",
    title: "Bài giảng - Nguyên hàm (PDF)",
    excerpt: "Ghi chú bài giảng và bài tập về nguyên hàm.",
    isFree: false,
    courseId: "math-12-s1",
    filename: "nguyen-ham.pdf",
  },
  {
    id: "d-3",
    title: "Bộ bài tập nâng cao - Lượng giác (PDF)",
    excerpt: "Bộ bài tập nâng cao kèm lời giải tỉ mỉ.",
    isFree: false,
    courseId: "math-12-s1",
    filename: "luong-giac-advanced.pdf",
  },
  {
    id: "d-4",
    title: "Tổng hợp công thức Toán 11-12 (Cheatsheet)",
    excerpt: "Tổng hợp công thức cần nhớ cho kỳ thi.",
    isFree: true,
    courseId: null,
    filename: "cong-thuc-tong-hop.pdf",
  },
];

type FilterMode = "all" | "free" | "owned";

const DocumentsPage: React.FC = () => {
  // Simulate a set of purchased course ids for the current user
  const [ownedCourses] = useState<string[]>(["math-12-s1"]); // demo: user has purchased this course
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<FilterMode>("all");

  const docs = useMemo(() => SAMPLE_DOCUMENTS, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return docs.filter((d) => {
      if (mode === "free" && !d.isFree) return false;
      if (mode === "owned") {
        const owned = d.isFree || (d.courseId && ownedCourses.includes(d.courseId));
        if (!owned) return false;
      }
      if (!q) return true;
      return (d.title + " " + (d.excerpt ?? "")).toLowerCase().includes(q);
    });
  }, [docs, search, mode, ownedCourses]);

  const handleDownload = (doc: DocumentItem) => {
    // In a real app we'd fetch the file; here we just show a success toast
    showSuccess(`Tải xuống: ${doc.filename ?? doc.title}`);
  };

  const handleBuyCourse = (courseId: string) => {
    // In real app we would redirect to course purchase page; here show message
    showError("Chức năng mua khoá học chưa có trong demo. Vui lòng tới trang khoá học để đăng ký.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Tài liệu" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tài liệu học tập</h1>
          <p className="text-sm text-gray-600 mb-6">
            Tải tài liệu miễn phí hoặc tài liệu dành cho học sinh đã mua khoá học. Tìm kiếm, lọc và tải xuống nhanh chóng.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <Input
              placeholder="Tìm tài liệu (tiêu đề, từ khoá...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:col-span-2"
            />
            <div className="flex items-center gap-2 justify-end">
              <Button
                variant={mode === "all" ? undefined : "outline"}
                onClick={() => setMode("all")}
                className="rounded-full px-3 py-1 text-sm"
              >
                Tất cả
              </Button>
              <Button
                variant={mode === "free" ? undefined : "outline"}
                onClick={() => setMode("free")}
                className="rounded-full px-3 py-1 text-sm"
              >
                Miễn phí
              </Button>
              <Button
                variant={mode === "owned" ? undefined : "outline"}
                onClick={() => setMode("owned")}
                className="rounded-full px-3 py-1 text-sm"
              >
                Dành cho tôi
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                Không tìm thấy tài liệu phù hợp.{" "}
                <Link to="/courses" className="text-blue-600 underline">
                  Khám phá khoá học
                </Link>
              </Card>
            ) : (
              filtered.map((d) => {
                const owned = d.isFree || (d.courseId ? ownedCourses.includes(d.courseId) : false);
                return (
                  <DocumentCard
                    key={d.id}
                    doc={d}
                    owned={owned}
                    onDownload={handleDownload}
                    onBuyCourse={handleBuyCourse}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentsPage;