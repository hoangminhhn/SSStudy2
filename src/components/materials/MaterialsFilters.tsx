"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MaterialsFiltersState {
  search: string;
  subject: string | null;
  grade: string | null;
  category: string | null;
  onlyVIP: boolean;
}

interface MaterialsFiltersProps {
  value: MaterialsFiltersState;
  onChange: (next: MaterialsFiltersState) => void;
  subjects?: string[];
  grades?: string[];
  categories?: string[];
}

const MaterialsFilters: React.FC<MaterialsFiltersProps> = ({
  value,
  onChange,
  subjects = ["Toán", "Vật Lý", "Hóa", "Tiếng Anh"],
  grades = ["10", "11", "12"],
  categories = ["Tóm tắt", "Bài tập", "Đề luyện", "Phân tích đề"],
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-3">
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Tìm kiếm tài liệu..."
        />
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Môn</label>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            className={cn(
              "px-3 py-1 rounded-md text-sm",
              value.subject ? "bg-white text-gray-800 border border-gray-200" : "bg-white text-gray-600 border border-gray-200"
            )}
            onClick={() => onChange({ ...value, subject: null })}
          >
            Tất cả
          </button>
          {subjects.map((s) => {
            const active = value.subject === s;
            return (
              <button
                key={s}
                onClick={() => onChange({ ...value, subject: active ? null : s })}
                className={cn("px-3 py-1 rounded-md text-sm", active ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200")}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Khối</label>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => onChange({ ...value, grade: null })} className="px-3 py-1 rounded-md text-sm bg-white border border-gray-200">Tất cả</button>
          {grades.map((g) => {
            const active = value.grade === g;
            return (
              <button
                key={g}
                onClick={() => onChange({ ...value, grade: active ? null : g })}
                className={cn("px-3 py-1 rounded-md text-sm", active ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200")}
              >
                Lớp {g}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Danh mục</label>
        <div className="mt-2 flex flex-wrap gap-2">
          <button onClick={() => onChange({ ...value, category: null })} className="px-3 py-1 rounded-md text-sm bg-white border border-gray-200">Tất cả</button>
          {categories.map((c) => {
            const active = value.category === c;
            return (
              <button
                key={c}
                onClick={() => onChange({ ...value, category: active ? null : c })}
                className={cn("px-3 py-1 rounded-md text-sm", active ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200")}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">Chỉ VIP (dành cho học viên đã mua khóa)</div>
        <button
          onClick={() => onChange({ ...value, onlyVIP: !value.onlyVIP })}
          className={cn("px-3 py-1 rounded-md text-sm", value.onlyVIP ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-200")}
        >
          {value.onlyVIP ? "Bật" : "Tắt"}
        </button>
      </div>

      <div className="mt-2">
        <Button onClick={() => onChange({ search: "", subject: null, grade: null, category: null, onlyVIP: false })} variant="ghost" className="w-full">
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default MaterialsFilters;