"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "./DocCard";
import FreeDocsList from "./FreeDocsList";

interface CourseDocs {
  courseId: string;
  courseTitle: string;
  docs: Doc[];
}

interface Props {
  userPurchased?: CourseDocs[]; // if present, show purchased area
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  onOpen: (doc: Doc) => void;
  onRequestLogin: () => void;
}

const mockPurchased: CourseDocs[] = [
  {
    courseId: "math-12-s1",
    courseTitle: "[2K8] Toán 12 - Master HSA",
    docs: [
      { id: "p-math-1", title: "Bài tập chương 1 (SV)", subject: "Toán", course: "Toán 12", author: "Thầy Đạt", updatedAt: "01/07/2025" },
      { id: "p-math-2", title: "Đáp án chương 1", subject: "Toán", course: "Toán 12", author: "SSStudy", updatedAt: "02/07/2025" },
    ],
  },
  {
    courseId: "physics-12-s1",
    courseTitle: "[2K8] Vật lý 12 - Chuyên đề",
    docs: [
      { id: "p-phy-1", title: "Tổng hợp công thức Vật Lý", subject: "Lý", course: "Vật lý 12", author: "Cô H", updatedAt: "20/06/2025" },
    ],
  },
];

const UserDocsPanel: React.FC<Props> = ({ userPurchased, favorites, onToggleFavorite, onOpen, onRequestLogin }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!userPurchased && userPurchased.length > 0);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(userPurchased?.[0]?.courseId ?? null);
  const toast = useToast();

  useEffect(() => {
    if (userPurchased && userPurchased.length > 0) {
      setLoggedIn(true);
      setSelectedCourse(userPurchased[0].courseId);
    }
  }, [userPurchased]);

  const courses = loggedIn ? (userPurchased ?? mockPurchased) : [];

  const docsForSelected = useMemo(() => {
    return courses.find((c) => c.courseId === selectedCourse)?.docs ?? [];
  }, [courses, selectedCourse]);

  return (
    <aside className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tài liệu của tôi</h3>
        <div>
          {loggedIn ? (
            <Button variant="outline" size="sm" onClick={() => { setLoggedIn(false); onRequestLogin(); }}>
              Đăng xuất
            </Button>
          ) : (
            <Button size="sm" onClick={() => { setLoggedIn(true); toast.toast({ title: "Đăng nhập tạm thời", description: "Bạn đã đăng nhập demo." }); onRequestLogin(); }}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      {!loggedIn && (
        <div className="mb-4 text-sm text-gray-600">
          Vui lòng đăng nhập để xem tài liệu dành riêng cho khóa học bạn đã mua.
        </div>
      )}

      {loggedIn && courses.length === 0 && (
        <div className="text-sm text-gray-600">Bạn chưa mua khóa học nào.</div>
      )}

      {loggedIn && courses.length > 0 && (
        <>
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-2">Khóa của bạn</div>
            <div className="flex flex-col gap-2">
              {courses.map((c) => (
                <button
                  key={c.courseId}
                  onClick={() => setSelectedCourse(c.courseId)}
                  className={`text-left w-full px-3 py-2 rounded-md text-sm ${selectedCourse === c.courseId ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-800 hover:bg-gray-100"}`}
                >
                  {c.courseTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-2">Tài liệu khóa</div>
            <FreeDocsList docs={docsForSelected} favorites={favorites} onToggleFavorite={onToggleFavorite} onOpen={onOpen} />
          </div>
        </>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-2">Gợi ý theo môn</div>
        <div className="flex flex-wrap gap-2">
          {["Toán", "Lý", "Hóa", "Anh"].map((s) => (
            <button key={s} className="text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200">
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserDocsPanel;