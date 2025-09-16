"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, X } from "lucide-react";

type Pill = {
  id: string;
  label: string;
};

const samplePills = {
  deThiThu: [
    { id: "3p", label: "Đủ 3 phần" },
    { id: "1da", label: "1 đáp án" },
    { id: "dungsai", label: "Đúng sai" },
    { id: "traloingan", label: "Trả lời ngắn" },
  ] as Pill[],
  baiKiemTra: [
    { id: "thi-giuaky1", label: "Thi giữa kỳ 1" },
    { id: "thi-giuaky2", label: "Thi giữa kỳ 2" },
    { id: "thi-cuoi-ky1", label: "Thi cuối kỳ 1" },
    { id: "thi-cuoi-ky2", label: "Thi cuối kỳ 2" },
  ] as Pill[],
  mon: [
    { id: "toan", label: "Toán" },
    { id: "ly", label: "Lý" },
    { id: "sinh", label: "Sinh" },
    { id: "anh", label: "Anh" },
    { id: "hoa", label: "Hóa" },
    { id: "van", label: "Văn" },
  ] as Pill[],
  lop: [
    { id: "lop10", label: "Lớp 10" },
    { id: "lop11", label: "Lớp 11" },
    { id: "lop12", label: "Lớp 12" },
  ] as Pill[],
};

const PillButton: React.FC<{
  pill: Pill;
  active?: boolean;
  onClick?: (id: string) => void;
}> = ({ pill, active = false, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.(pill.id)}
      className={`text-sm px-3 py-1 rounded-full border ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-200"
      }`}
    >
      {pill.label}
    </button>
  );
};

const Collapsible: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between text-sm font-medium text-gray-700 px-1 py-2"
      >
        <span>{title}</span>
        <span className="ml-2">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

const ExamFilters: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({
    toan: true, // example selected
  });
  const [selectedCity, setSelectedCity] = useState<string | null>("Hà Nội");
  const [deThiThuActive, setDeThiThuActive] = useState<Record<string, boolean>>({});
  const [baiKiemTraActive, setBaiKiemTraActive] = useState<Record<string, boolean>>({});
  const [lopActive, setLopActive] = useState<Record<string, boolean>>({});

  const toggleMap = (mapSetter: React.Dispatch<React.SetStateAction<Record<string, boolean>>>, id: string) =>
    mapSetter((prev) => ({ ...prev, [id]: !prev[id] }));

  const clearFilters = () => {
    setSearch("");
    setSelected({});
    setSelectedCity(null);
    setDeThiThuActive({});
    setBaiKiemTraActive({});
    setLopActive({});
  };

  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white rounded-lg shadow-sm p-0 sticky top-20 overflow-hidden">
        {/* Blue header */}
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-semibold">Tốt nghiệp</div>
          <button
            aria-label="Mở/đóng nhóm Tốt nghiệp"
            className="p-1 rounded-md hover:bg-white/10"
            type="button"
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* Search */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Đề thi thử</h3>
            <Input
              placeholder="Tìm đề theo tiêu đề..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {samplePills.deThiThu.map((p) => (
                <PillButton
                  key={p.id}
                  pill={p}
                  active={!!deThiThuActive[p.id]}
                  onClick={() => toggleMap(setDeThiThuActive, p.id)}
                />
              ))}
            </div>
          </div>

          {/* Bài kiểm tra */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Bài kiểm tra</h3>
            <div className="flex flex-wrap gap-2">
              {samplePills.baiKiemTra.map((p) => (
                <PillButton
                  key={p.id}
                  pill={p}
                  active={!!baiKiemTraActive[p.id]}
                  onClick={() => toggleMap(setBaiKiemTraActive, p.id)}
                />
              ))}
            </div>
          </div>

          {/* Môn */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Môn</h3>
            <div className="flex flex-wrap gap-2">
              {samplePills.mon.map((p) => (
                <PillButton
                  key={p.id}
                  pill={p}
                  active={!!selected[p.id]}
                  onClick={() => setSelected((s) => ({ ...s, [p.id]: !s[p.id] }))}
                />
              ))}
            </div>
          </div>

          {/* Lớp */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Lớp</h3>
            <div className="flex flex-wrap gap-2">
              {samplePills.lop.map((p) => (
                <PillButton
                  key={p.id}
                  pill={p}
                  active={!!lopActive[p.id]}
                  onClick={() => toggleMap(setLopActive, p.id)}
                />
              ))}
            </div>
          </div>

          {/* Collapsible groups */}
          <Collapsible title="APT" defaultOpen={false}>
            <div className="text-sm text-gray-600">Các bộ đề APT (mô tả ngắn)</div>
          </Collapsible>

          <Collapsible title="TSA" defaultOpen={false}>
            <div className="text-sm text-gray-600">Các bộ đề TSA (mô tả ngắn)</div>
          </Collapsible>

          <Collapsible title="HSA" defaultOpen={false}>
            <div className="text-sm text-gray-600">Các bộ đề HSA (mô tả ngắn)</div>
          </Collapsible>

          {/* Thành phố */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Thành phố</h3>
            <div className="flex items-center gap-2">
              {selectedCity ? (
                <div className="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm gap-2">
                  <span>{selectedCity}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCity(null)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    aria-label="Xóa thành phố"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Không có thành phố nào được chọn</div>
              )}
            </div>
          </div>

          {/* Clear filters */}
          <div className="mt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Xoá bộ lọc
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ExamFilters;