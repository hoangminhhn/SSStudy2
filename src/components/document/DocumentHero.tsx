"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, User } from "lucide-react";
import { Doc } from "@/data/docsData";

interface DocumentHeroProps {
  doc: Doc;
}

const DocumentHero: React.FC<DocumentHeroProps> = ({ doc }) => {
  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Gradient banner */}
      <div className="h-44 bg-gradient-to-r from-violet-500 to-purple-400 flex items-center justify-center relative">
        <div className="text-white opacity-20">
          {/* large icon */}
          <svg width="84" height="84" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 7h10v2H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11h10v2H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 15h6v2H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        {doc.free && (
          <Badge className="absolute right-4 top-4 bg-green-500 text-white">MIỄN PHÍ</Badge>
        )}
      </div>

      {/* Title and meta */}
      <div className="p-6 bg-white -mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{doc.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{doc.summary}</p>

        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-gray-400" />
            <span className="text-gray-700 font-medium">SSStudy</span> {/* changed username */}
          </div>

          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-400" />
            <span>06/10/2025</span>
          </div>

          <div className="flex items-center space-x-2">
            <Eye size={16} className="text-gray-400" />
            <span>11 lượt xem</span>
          </div>

          <div className="flex items-center space-x-2">
            <Download size={16} className="text-gray-400" />
            <span>0 lượt tải</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DocumentHero;