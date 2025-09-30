"use client";

import React, { useEffect, useMemo, useState } from "react";
import DocsFilterBar from "./DocsFilterBar";
import FreeDocsList from "./FreeDocsList";
import UserDocsPanel from "./UserDocsPanel";
import { Doc } from "./DocCard";
import { showSuccess } from "@/utils/toast";

// Mock free docs data
const MOCK_DOCS: Doc[] = [
  { id: "f-1", title: "Tổng hợp công thức Toán 12", subject: "Toán", course: null, author: "SSStudy", updatedAt: "10/06/2025", free: true },
  { id: "f-2", title: "Bảng đạo hàm và tích phân", subject: "Toán", course: null, author: "Thầy Đạt", updatedAt: "01/05/2025", free: true },
  { id: "f-3", title: "Mẹo làm bài nhanh - Vật Lý", subject: "Lý", course: null, author: "Cô H", updatedAt: "15/04/2025", free: true },
  { id: "f-4", title: "Từ vựng chủ đề học thuật (Anh)", subject: "Anh", course: null, author: "Team EN", updatedAt: "20/03/2025", free: true },
];

interface Props {
  purchased?: boolean; // if true, simulate having purchased courses (UserDocsPanel will show)
}

const DocumentsLayout: React.FC<Props> = ({ purchased = false }) => {
  const [filters, setFilters] = useState({
    query: "",
    subject: "" as string | "",
    course: "" as string | "",
    sortBy: "recent" as "recent" | "alpha",
  });

  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem("docs:favorites");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("docs:favorites", JSON.stringify(favorites));
  }, [favorites]);

  const subjects = useMemo(() => {
    const s = new Set<string>();
    MOCK_DOCS.forEach((d) => s.add(d.subject));
    return Array.from(s);
  }, []);

  const courses = useMemo(() => {
    // mock course list: include some sample names
    return ["Toán 12 - Master HSA", "Vật lý 12 - Chuyên đề", "Tiếng Anh 12 - Giao tiếp"];
  }, []);

  const filteredDocs = useMemo(() => {
    let ds = MOCK_DOCS.slice();
    if (filters.query) {
      const q = filters.query.toLowerCase();
      ds = ds.filter((d) => d.title.toLowerCase().includes(q) || (d.author ?? "").toLowerCase().includes(q));
    }
    if (filters.subject) {
      ds = ds.filter((d) => d.subject === filters.subject);
    }
    if (filters.course) {
      ds = ds.filter((d) => d.course === filters.course);
    }
    if (filters.sortBy === "alpha") {
      ds.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      ds.sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
    }
    return ds;
  }, [filters]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showSuccess(next[id] ? "Đã thêm vào yêu thích" : "Đã bỏ yêu thích");
      return next;
    });
  };

  const handleOpenDoc = (doc: Doc) => {
    // record in recent list
    try {
      const raw = localStorage.getItem("docs:recent") || "[]";
      const rec: string[] = JSON.parse(raw);
      const next = [doc.id, ...rec.filter((r) => r !== doc.id)].slice(0, 10);
      localStorage.setItem("docs:recent", JSON.stringify(next));
    } catch {}
    showSuccess(`Mở tài liệu: ${doc.title}`);
  };

  // Simulate purchased area data if requested
  const purchasedData = purchased
    ? undefined // if we want to pass real purchased data we could; UserDocsPanel has fallback mockPurchased
    : undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main column: filters + free docs */}
      <div className="lg:col-span-3 space-y-4">
        <DocsFilterBar
          subjects={subjects}
          courses={courses}
          filters={filters}
          onChange={(next) => setFilters(next)}
          onClear={() => setFilters({ query: "", subject: "", course: "", sortBy: "recent" })}
        />

        <section aria-labelledby="free-docs" className="space-y-4">
          <h2 id="free-docs" className="text-lg font-semibold">Tài liệu miễn phí</h2>
          <FreeDocsList docs={filteredDocs} favorites={favorites} onToggleFavorite={handleToggleFavorite} onOpen={handleOpenDoc} />
        </section>

        <section aria-labelledby="recent-docs" className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tài liệu truy cập gần đây</h3>
          <RecentDocs onOpen={handleOpenDoc} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        </section>
      </div>

      {/* Right column: user-specific */}
      <div className="lg:col-span-1">
        <UserDocsPanel
          userPurchased={purchasedData}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpen={handleOpenDoc}
          onRequestLogin={() => showSuccess("Màn hình đăng nhập (demo)")}
        />
      </div>
    </div>
  );
};

export default DocumentsLayout;

/** Small RecentDocs component inside the same file to keep simple */
const RecentDocs: React.FC<{ onOpen: (d: Doc) => void; favorites: Record<string, boolean>; onToggleFavorite: (id: string) => void; }> = ({ onOpen, favorites, onToggleFavorite }) => {
  const [recentDocs, setRecentDocs] = React.useState<Doc[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("docs:recent") || "[]";
      const ids: string[] = JSON.parse(raw);
      const docs = ids
        .map((id) => MOCK_DOCS.find((d) => d.id === id))
        .filter((d): d is Doc => !!d)
        .slice(0, 6);
      setRecentDocs(docs);
    } catch {
      setRecentDocs([]);
    }
  }, []);

  if (recentDocs.length === 0) {
    return <div className="text-sm text-gray-500">Chưa có lịch sử truy cập.</div>;
  }

  return (
    <div className="space-y-2">
      {recentDocs.map((d) => (
        <div key={d.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-md p-2">
          <button className="text-left text-sm text-gray-800 truncate" onClick={() => onOpen(d)}>{d.title}</button>
          <div className="flex items-center gap-2">
            <button onClick={() => onToggleFavorite(d.id)} className={favorites[d.id] ? "text-yellow-400" : "text-gray-300"}>
              ★
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};