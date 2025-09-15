"use client";

import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const SubjectChip: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-md text-sm border",
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      )}
    >
      {children}
    </button>
  );
};

const LevelChip: React.FC<{ children: React.ReactNode; active?: boolean; onClick?: () => void }> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-md text-sm border",
        active ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
      )}
    >
      {children}
    </button>
  );
};

const ExamFilters: React.FC = () => {
  const [subject, setSubject] = React.useState<string | null>("Toán");
  const [grade, setGrade] = React.useState<string | null>("Lớp 12");
  const [search, setSearch] = React.useState("");

  return (
    <aside className="w-full lg:w-80">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Đề thi thử</h3>
          <Input placeholder="Tìm đề theo tiêu đề..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Accordion type="single" collapsible defaultValue="filter-1" className="mb-4">
          <AccordionItem value="filter-1">
            <AccordionTrigger className="px-0 py-2 text-sm font-semibold">Bộ lọc nhanh</AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Môn</div>
                  <div className="flex flex-wrap gap-2">
                    {["Toán", "Vật lý", "Hóa", "Sinh", "Anh", "Văn"].map((s) => (
                      <SubjectChip key={s} active={subject === s} onClick={() => setSubject(subject === s ? null : s)}>
                        {s}
                      </SubjectChip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-2">Lớp</div>
                  <div className="flex gap-2">
                    {["Lớp 10", "Lớp 11", "Lớp 12"].map((g) => (
                      <LevelChip key={g} active={grade === g} onClick={() => setGrade(grade === g ? null : g)}>
                        {g}
                      </LevelChip>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-50 text-blue-700">Đề thi thử</Badge>
                    <Badge className="bg-green-50 text-green-700">Livestream</Badge>
                    <Badge className="bg-red-50 text-red-700">TSA</Badge>
                    <Badge className="bg-violet-50 text-violet-700">APT</Badge>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Áp dụng</Button>
                </div>

                <div className="pt-2 text-center">
                  <button className="text-sm text-blue-600 hover:underline">Xóa bộ lọc</button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="filter-2">
            <AccordionTrigger className="px-0 py-2 text-sm font-semibold">Khu vực / Thành phố</AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="space-y-2">
                <div className="text-sm text-gray-700">Hà Nội</div>
                <div className="text-sm text-gray-500">Hồ Chí Minh</div>
                <div className="text-sm text-gray-500">Đà Nẵng</div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="filter-3">
            <AccordionTrigger className="px-0 py-2 text-sm font-semibold">Khác</AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="space-y-2">
                <div className="text-sm text-gray-700">Kiểu đề</div>
                <div className="text-sm text-gray-500">Có đáp án</div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default ExamFilters;