"use client";

import React from "react";
import { Star, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Doc {
  id: string;
  title: string;
  subject: string;
  course?: string | null;
  author?: string;
  updatedAt?: string;
  free?: boolean;
}

interface DocCardProps {
  doc: Doc;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (doc: Doc) => void;
}

const DocCard: React.FC<DocCardProps> = ({ doc, isFavorite, onToggleFavorite, onOpen }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <FileText size={18} />
        </div>

        <div className="flex-1 min-w-0">
          <button
            onClick={() => onOpen(doc)}
            className="text-left w-full"
            aria-label={`Mở tài liệu ${doc.title}`}
          >
            <div className="text-sm font-semibold text-gray-800 truncate">{doc.title}</div>
            <div className="text-xs text-gray-500 mt-1">
              {doc.course ? `${doc.course} • ` : ""}
              {doc.subject} • {doc.author ?? "SSStudy"} • {doc.updatedAt ?? "—"}
            </div>
          </button>
        </div>

        <div className="flex flex-col items-end">
          <button
            onClick={() => onToggleFavorite(doc.id)}
            aria-pressed={isFavorite}
            className={cn(
              "p-1 rounded-md transition",
              isFavorite ? "text-yellow-400" : "text-gray-300 hover:text-gray-500"
            )}
            title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            <Star size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocCard;