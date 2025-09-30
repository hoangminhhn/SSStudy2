"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Lock } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

export interface DocumentItem {
  id: string;
  title: string;
  excerpt?: string;
  isFree?: boolean;
  courseId?: string | null; // if tied to a course
  filename?: string;
}

interface DocumentCardProps {
  doc: DocumentItem;
  owned: boolean;
  onDownload?: (doc: DocumentItem) => void;
  onBuyCourse?: (courseId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, owned, onDownload, onBuyCourse }) => {
  const handleDownload = () => {
    if (doc.isFree || owned) {
      showSuccess("Bắt đầu tải tài liệu...");
      onDownload?.(doc);
    } else {
      showError("Bạn cần mua khóa học để tải tài liệu này.");
    }
  };

  return (
    <Card className="shadow-sm rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{doc.title}</h3>
            {doc.excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{doc.excerpt}</p>}
            <div className="mt-3 flex items-center gap-2">
              {doc.isFree ? (
                <Badge className="bg-green-100 text-green-800">Miễn phí</Badge>
              ) : owned ? (
                <Badge className="bg-blue-100 text-blue-800">Đã mua</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800">Khoá học yêu cầu</Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-full px-3 py-1"
              onClick={handleDownload}
              aria-label={`Tải ${doc.title}`}
            >
              <Download size={14} />
              <span className="text-xs">Tải</span>
            </Button>

            {!doc.isFree && !owned && doc.courseId ? (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 rounded-full px-3 py-1"
                onClick={() => onBuyCourse?.(doc.courseId!)}
              >
                <Lock size={14} />
                <span className="text-xs">Mua khoá học</span>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;