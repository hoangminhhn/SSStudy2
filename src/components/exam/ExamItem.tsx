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
    <div className="bg-white rounded-md shadow-sm p-4 border border-gray-100 flex items-center justify-between space-x-4">
      <div className="flex items-start gap-4">
        {tag && (
          <Badge className={cn("mr-2", tag.length > 0 ? "bg-green-50 text-green-700" : "bg-gray-50")}>
            {tag}
          </Badge>
        )}
        <div>
          <div className="text-gray-800 font-semibold">{title}</div>
          <div className="text-xs text-gray-400 mt-1">Đề thi mô phỏng - ID: {id}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!isDone && !isLocked && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2" onClick={onStart}>
            Làm bài
          </Button>
        )}

        {isDone && (
          <>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2" onClick={onRetry}>
              Làm lại
            </Button>
            <Button variant="outline" className="rounded-full px-4 py-2" onClick={onViewResult}>
              Xem kết quả
            </Button>
          </>
        )}

        {isLocked && (
          <>
            <Button variant="ghost" disabled className="rounded-full px-4 py-2 text-gray-400 bg-gray-100">
              Làm lại
            </Button>
            <Button variant="outline" className="rounded-full px-4 py-2" onClick={onViewResult}>
              Xem kết quả
            </Button>
          </>
        )}

        <Button variant="ghost" size="icon" className="border border-gray-200 rounded-full p-2" onClick={() => {}}>
          <Download size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ExamItem;