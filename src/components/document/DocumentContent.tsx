"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Doc } from "@/data/docsData";

interface DocumentContentProps {
  doc: Doc;
}

const DocumentContent: React.FC<DocumentContentProps> = ({ doc }) => {
  return (
    <div className="mt-6">
      <Tabs defaultValue="content">
        <div className="bg-white border rounded-t-md">
          <TabsList className="border-b">
            <TabsTrigger value="content" className="px-4 py-3">Nội dung</TabsTrigger>
            <TabsTrigger value="attachments" className="px-4 py-3">File đính kèm (3)</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content">
          <Card className="mt-0">
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-3">
                <span className="font-medium text-gray-700">SSStudy</span> • Đã xem lúc 13:30:06 7/10/2025
              </div>
              <div className="prose prose-sm text-gray-700">
                <p>
                  Tài liệu này bao gồm tất cả các công thức quan trọng trong chương trình Toán lớp 12, được sắp xếp theo từng chương một cách khoa học và dễ hiểu.
                </p>

                <p>
                  Nội dung trình bày cô đọng, ví dụ minh họa và bảng tóm tắt công thức để học sinh có thể tra cứu nhanh trong quá trình ôn luyện.
                </p>
              </div>

              <div className="mt-6 border-t pt-3 text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div>• Người xem: SSStudy</div>
                  <div>• IP: 123.45.67.89</div>
                  <div>• 13:30:06 7/10/2025</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="attachments">
          <Card className="mt-0">
            <div className="p-4 text-sm text-gray-700">
              <div className="mb-3 font-medium">File đính kèm (3)</div>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">tong-hop-cong-thuc.pdf</div>
                    <div className="text-xs text-gray-500">PDF • 1.2 MB</div>
                  </div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Tải xuống</button>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">bang-tom-tat.png</div>
                    <div className="text-xs text-gray-500">Hình ảnh • 120 KB</div>
                  </div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">Tải xuống</button>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">video-intro.mp4</div>
                    <div className="text-xs text-gray-500">Video • 8 MB</div>
                  </div>
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded">Xem</button>
                </li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentContent;