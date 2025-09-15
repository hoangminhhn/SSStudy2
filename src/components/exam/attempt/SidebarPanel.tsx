"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarPanelProps {
  total: number;
  currentIndex: number;
  answers: Record<string, string | null>;
  onJump: (index: number) => void;
  remainingSeconds: number;
  onSubmit: () => void;
}

const formatTime = (s: number) => {
  const mm = Math.floor(s / 60).toString().padStart(2, "0");
  const ss = Math.floor(s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

const SidebarPanel: React.FC<SidebarPanelProps> = ({ total, currentIndex, answers, onJump, remainingSeconds, onSubmit }) => {
  const answeredCount = Object.values(answers).filter(Boolean).length;
  return (
    <aside className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm text-center">
        <div className="text-xs text-gray-500">Thời gian còn lại</div>
        <div className="text-3xl font-semibold text-red-600 mt-2">{formatTime(remainingSeconds)}</div>
        <div className="text-sm text-gray-500 mt-1">Hãy quản lý thời gian tốt</div>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-gray-700">Tiến độ</div>
          <div className="text-sm text-gray-500">{answeredCount}/{total}</div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: total }).map((_, i) => {
            const qId = `q-${i + 1}`;
            const answered = !!answers[qId];
            const isCurrent = i === currentIndex;
            return (
              <button
                key={i}
                onClick={() => onJump(i)}
                className={cn(
                  "w-full h-10 rounded-md text-sm font-medium",
                  isCurrent ? "bg-blue-600 text-white" : answered ? "bg-green-100 text-green-800" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                )}
                aria-label={`Đi tới câu ${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full" onClick={onSubmit}>
            Nộp bài & Xem kết quả
          </Button>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Lưu ý: Sau khi nộp, thời gian sẽ dừng và bạn sẽ được chuyển sang màn kết quả.
      </div>
    </aside>
  );
};

export default SidebarPanel;