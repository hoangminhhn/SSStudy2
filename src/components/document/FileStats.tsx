"use client";

import React from "react";
import { Card } from "@/components/ui/card";

interface FileStatsProps {
  total?: number;
  pdf?: number;
  images?: number;
  video?: number;
}

const FileStats: React.FC<FileStatsProps> = ({ total = 3, pdf = 1, images = 1, video = 0 }) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h4 className="font-semibold mb-3">Thống kê file</h4>
      <ul className="text-sm text-gray-700 space-y-2">
        <li className="flex justify-between"><span>Tổng số file:</span><span>{total}</span></li>
        <li className="flex justify-between"><span>PDF:</span><span>{pdf}</span></li>
        <li className="flex justify-between"><span>Hình ảnh:</span><span>{images}</span></li>
        <li className="flex justify-between"><span>Video:</span><span>{video}</span></li>
      </ul>
    </div>
  );
};

export default FileStats;