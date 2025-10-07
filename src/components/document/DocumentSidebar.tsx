"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Doc } from "@/data/docsData";
import TagsList from "./TagsList";
import FileStats from "./FileStats";
import { Badge } from "@/components/ui/badge";

interface DocumentSidebarProps {
  doc: Doc;
}

const DocumentSidebar: React.FC<DocumentSidebarProps> = ({ doc }) => {
  const tags = ["toán học", "công thức", "lớp 12", "miễn phí"];
  return (
    <aside className="space-y-4">
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-semibold mb-3">Thông tin tài liệu</h4>

        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <div className="text-xs text-gray-500">Danh mục</div>
            <div className="mt-1">
              <Badge className="bg-gray-100 text-gray-700">{doc.category ?? "Tài liệu tham khảo"}</Badge>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Môn học</div>
            <div className="mt-1">
              <Badge className="bg-gray-100 text-gray-700">{doc.subject}</Badge>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Khối lớp</div>
            <div className="mt-1"><Badge className="bg-gray-100 text-gray-700">{doc.grade ?? "Lớp 12"}</Badge></div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Tags:</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded-full"> {t} </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TagsList tags={tags} />

      <FileStats />
    </aside>
  );
};

export default DocumentSidebar;