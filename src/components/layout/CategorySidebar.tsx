"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

interface CategorySidebarProps {
  className?: string;
}

const sections = [
  {
    id: "section-dgnl",
    title: "Luyện thi ĐGNL - ĐGTD",
    items: ["HSA", "APT", "TSA"],
  },
  {
    id: "section-university",
    title: "Đại học - Cao đẳng",
    items: ["Toán Cao Cấp", "Vật Lý Đại Cương"],
  },
  {
    id: "section-grade12",
    title: "Lớp 12 - Luyện thi ĐH",
    items: ["Toán", "Lý", "Tiếng Anh", "Lịch sử"],
  },
  {
    id: "section-thcs",
    title: "Luyện thi THCS",
    items: ["Toán", "Văn"],
  },
  {
    id: "section-10-11",
    title: "Luyện thi 10 - 11",
    items: ["Toán", "Lý"],
  },
];

const CategorySidebar: React.FC<CategorySidebarProps> = ({ className = "" }) => {
  const [open, setOpen] = React.useState<string | undefined>("section-dgnl");

  return (
    <div className={`bg-white rounded-lg shadow-sm p-0 overflow-hidden ${className}`}>
      <div className="p-3">
        {/* Top pill (acts like selected header in the screenshot) */}
        <div className="mb-3">
          <Link
            to="#"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-md shadow-sm"
          >
            <span>Luyện thi ĐGNL - ĐGTD</span>
            <span className="w-2 h-2 rounded-full bg-white/80" />
          </Link>
        </div>

        <Accordion type="single" collapsible value={open} onValueChange={(v) => setOpen(v ?? undefined)}>
          {sections.map((section) => {
            const isActive = open === section.id;
            return (
              <div key={section.id} className="border-t border-gray-100 first:border-t-0">
                <AccordionItem value={section.id} className="group">
                  <AccordionTrigger className="w-full p-3 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <span className={isActive ? "text-blue-700 font-medium" : "font-medium text-gray-700"}>
                        {section.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${isActive ? "rotate-180 text-gray-600" : ""}`}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <ul className="divide-y divide-gray-100">
                      {section.items.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to="#"
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default CategorySidebar;