"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Filters {
  query: string;
  subject: string | "";
  course: string | "";
  sortBy: "recent" | "alpha";
}

interface Props {
  subjects: string[];
  courses: string[];
  filters: Filters;
  onChange: (next: Filters) => void;
  onClear: () => void;
}

const DocsFilterBar: React.FC<Props> = ({ subjects, courses, filters, onChange, onClear }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3 items-start md:items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <Input
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Tìm tài liệu theo tên, mô tả..."
          className="pl-10"
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select onValueChange={(v) => onChange({ ...filters, subject: v })} value={filters.subject || ""}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Môn" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả môn</SelectItem>
            {subjects.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onChange({ ...filters, course: v })} value={filters.course || ""}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Khóa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tất cả khóa</SelectItem>
            {courses.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => onChange({ ...filters, sortBy: v as any })} value={filters.sortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Gần đây</SelectItem>
            <SelectItem value="alpha">A → Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="ml-auto flex-shrink-0">
        <Button variant="outline" onClick={onClear}>Xóa</Button>
      </div>
    </div>
  );
};

export default DocsFilterBar;