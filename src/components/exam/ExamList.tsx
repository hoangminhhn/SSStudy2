"use client";

import React from "react";
import ExamItem from "./ExamItem";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Exam {
  id: string;
  title: string;
  tag?: string;
  status?: "ready" | "done" | "locked";
}

const SAMPLE_EXAMS: Exam[] = [
  { id: "e-1", title: "Thi thử tốt nghiệp năm 2024 - Toán", tag: "V-ACT", status: "ready" },
  { id: "e-2", title: "Thi thử tốt nghiệp năm 2024 - Hóa", tag: "HSA", status: "done" },
  { id: "e-3", title: "Thi thử tốt nghiệp năm 2024 - Lý", tag: "TSA", status: "locked" },
  { id: "e-4", title: "Thi thử tốt nghiệp năm 2024 - Văn", tag: "Tốt Nghiệp", status: "done" },
  { id: "e-5", title: "Thi thử tốt nghiệp năm 2024 - Anh", tag: "V-ACT", status: "ready" },
  { id: "e-6", title: "Thi thử tốt nghiệp năm 2024 - Sinh", tag: "HSA", status: "ready" },
  { id: "e-7", title: "Thi thử tốt nghiệp năm 2024 - Toán (2)", tag: "TSA", status: "locked" },
  { id: "e-8", title: "Thi thử tốt nghiệp năm 2024 - Hóa (2)", tag: "Tốt Nghiệp", status: "done" },
];

const useIsSmall = () => {
  const [isSmall, setIsSmall] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });

  React.useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isSmall;
};

const ExamList: React.FC = () => {
  const [onlyDone, setOnlyDone] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const isSmall = useIsSmall();
  const perPage = isSmall ? 4 : 5;

  const filtered = React.useMemo(() => {
    return SAMPLE_EXAMS.filter((e) => {
      if (onlyDone && e.status !== "done") return false;
      if (query && !e.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [onlyDone, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      {/* Controls: stack on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-sm text-gray-600">Đã thi</div>
          <Switch checked={onlyDone} onCheckedChange={setOnlyDone} />
        </div>

        <div className="w-full sm:w-80">
          <Input placeholder="Tìm đề..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="space-y-3">
        {pageItems.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">Không tìm thấy đề thi phù hợp.</Card>
        ) : (
          pageItems.map((e) => (
            <ExamItem
              key={e.id}
              id={e.id}
              title={e.title}
              tag={e.tag}
              status={e.status}
              onStart={() => alert(`Bắt đầu: ${e.id}`)}
              onRetry={() => alert(`Làm lại: ${e.id}`)}
              onViewResult={() => alert(`Xem kết quả: ${e.id}`)}
            />
          ))
        )}
      </div>

      {/* Pagination: responsive layout */}
      <div className="pt-4">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">
          <div className="text-sm text-gray-500">
            Hiển thị {pageItems.length} trên {filtered.length} kết quả
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2"
              aria-label="Trang trước"
            >
              <ChevronLeft />
            </Button>

            <div className="px-3 py-1 rounded-md bg-white border border-gray-200 shadow-sm text-sm">
              Trang {page} / {totalPages}
            </div>

            <Button
              variant="ghost"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2"
              aria-label="Trang sau"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamList;