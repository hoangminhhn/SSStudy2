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
  { id: "e-1", title: "Thi thử tốt nghiệp năm 2024", tag: "V-ACT", status: "ready" },
  { id: "e-2", title: "Thi thử tốt nghiệp năm 2024", tag: "HSA", status: "done" },
  { id: "e-3", title: "Thi thử tốt nghiệp năm 2024", tag: "TSA", status: "locked" },
  { id: "e-4", title: "Thi thử tốt nghiệp năm 2024", tag: "Tốt Nghiệp", status: "done" },
  { id: "e-5", title: "Thi thử tốt nghiệp năm 2024", tag: "V-ACT", status: "ready" },
  { id: "e-6", title: "Thi thử tốt nghiệp năm 2024", tag: "HSA", status: "ready" },
  { id: "e-7", title: "Thi thử tốt nghiệp năm 2024", tag: "TSA", status: "locked" },
  { id: "e-8", title: "Thi thử tốt nghiệp năm 2024", tag: "Tốt Nghiệp", status: "done" },
];

const ExamList: React.FC = () => {
  const [onlyDone, setOnlyDone] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const perPage = 5;

  const filtered = React.useMemo(() => {
    return SAMPLE_EXAMS.filter((e) => {
      if (onlyDone && e.status !== "done") return false;
      if (query && !e.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [onlyDone, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Đã thi</div>
          <Switch checked={onlyDone} onCheckedChange={setOnlyDone} />
        </div>

        <div className="w-80">
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

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-3 pt-4">
        <Button variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          <ChevronLeft />
        </Button>
        <div className="px-3 py-1 rounded-md bg-white border border-gray-200 shadow-sm">
          Trang {page} / {totalPages}
        </div>
        <Button variant="ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ExamList;