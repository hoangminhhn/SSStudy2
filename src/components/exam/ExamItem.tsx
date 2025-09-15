"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExamItemProps {
  id: string;
  title: string;
  tag?: string;
  status?: "ready" | "done" | "locked";
  onStart?: () => void;
  onRetry?: () => void;
  onViewResult?: () => void;
}

const ExamItem: React.FC<ExamItemProps> = ({ id, title, tag, status = "ready", onStart, onRetry, onViewResult }) => {
  const isDone = status === "done";
  const isLocked = status === "locked";

  return (
    <div className="bg-white rounded-md shadow-sm p-4 border border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
      {/* Left: title + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3">
          {tag && (
            <Badge className={cn("flex-shrink-0 mt-0.5", tag.length > 0 ? "bg-green-50 text-green-700" : "bg-gray-50")}>
              {tag}
            </Badge>
          )}
          <div className="min-w-0">
            <div className="text-gray-800 font-semibold truncate">{title}</div>
            <div className="text-xs text-gray-400 mt-1">Đề thi mô phỏng - ID: {id}</div>
          </div>
        </div>
      </div>

      {/* Right: actions */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Main action(s) - on mobile: full width stacked; on desktop: inline */}
        {!isDone && !isLocked && (
          <Button
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
            onClick={onStart}
          >
            Làm bài
          </Button>
        )}

        {isDone && (
          <div className="flex w-full sm:w-auto gap-2">
            <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2" onClick={onRetry}>
              Làm lại
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none rounded-full px-4 py-2" onClick={onViewResult}>
              Xem kết quả
            </Button>
          </div>
        )}

        {isLocked && (
          <div className="flex w-full sm:w-auto gap-2">
            <Button variant="ghost" disabled className="flex-1 sm:flex-none rounded-full px-4 py-2 text-gray-400 bg-gray-100">
              Làm lại
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none rounded-full px-4 py-2" onClick={onViewResult}>
              Xem kết quả
            </Button>
          </div>
        )}

        {/* Download icon stays compact */}
        <Button variant="ghost" size="icon" className="border border-gray-200 rounded-full p-2 flex-shrink-0" onClick={() => {}}>
          <Download size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ExamItem;