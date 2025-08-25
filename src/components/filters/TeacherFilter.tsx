"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface TeacherFilterProps {
  teachers?: string[];
  placeholder?: string;
  onSelect?: (teacher: string | null) => void;
  maxVisible?: number;
}

const defaultTeachers = [
  "Thầy Nguyễn Tiến Đạt",
  "Cô Nguyễn Thị Lan",
  "Thầy Lê Văn K",
  "Cô Phạm Thị H",
  "Thầy Trần Văn X",
  "Cô Hoàng Thị Y",
  "Thầy Đỗ Văn Z",
];

export default function TeacherFilter({
  teachers = defaultTeachers,
  placeholder = "Tìm kiếm giảng viên...",
  onSelect,
  maxVisible = 5,
}: TeacherFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string | null>(null);

  const normalized = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filtered = React.useMemo(() => {
    const q = normalized(query.trim());
    const matches = teachers.filter((t) => normalized(t).includes(q));
    return matches.slice(0, maxVisible);
  }, [teachers, query, maxVisible]);

  const handleSelect = (t: string | null) => {
    setSelected(t);
    setOpen(false);
    setQuery("");
    onSelect?.(t);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "text-sm rounded-md px-3 py-2 flex items-center space-x-2",
            selected ? "bg-white text-gray-800" : "bg-white text-gray-700"
          )}
          aria-label="Lọc theo giảng viên"
        >
          <span>{selected ?? "Giảng viên"}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Search className="text-gray-400" size={16} />
          <Input
            autoFocus
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="!p-2 !py-1"
            aria-label="Tìm kiếm giảng viên"
          />
        </div>

        <div className="max-h-52 overflow-auto">
          {filtered.length === 0 ? (
            <div className="py-4 text-sm text-gray-500">Không tìm thấy giảng viên.</div>
          ) : (
            filtered.map((t) => {
              const isSelected = t === selected;
              return (
                <button
                  key={t}
                  onClick={() => handleSelect(t)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors",
                    isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-50 text-gray-800"
                  )}
                >
                  {t}
                </button>
              );
            })
          )}
        </div>

        <div className="mt-2 border-t pt-2">
          <button
            onClick={() => handleSelect(null)}
            className="w-full text-left text-sm text-gray-600 hover:text-gray-800 hover:underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}