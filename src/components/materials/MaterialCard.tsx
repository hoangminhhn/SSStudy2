"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, FileText, Lock } from "lucide-react";
import { Material } from "@/data/materialsData";
import { useCurrentUser } from "@/hooks/use-user";
import { showError, showSuccess } from "@/utils/toast";

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const user = useCurrentUser();
  const hasAccess =
    material.accessLevel === "all" ||
    (material.accessLevel === "purchased" && material.courseId && user.purchasedCourseIds.includes(material.courseId));

  const handleDownload = () => {
    if (!hasAccess) {
      showError("Tài liệu này chỉ dành cho học viên đã mua khóa tương ứng.");
      return;
    }
    showSuccess("Bắt đầu tải xuống...");
    // For demo, just open the fileUrl in a new tab
    if (material.fileUrl) {
      window.open(material.fileUrl, "_blank");
    } else {
      showError("Không tìm thấy tài liệu để tải.");
    }
  };

  return (
    <Card className="shadow-sm rounded-lg overflow-hidden">
      <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
        <img src={material.thumbnail ?? "/images/placeholder.svg"} alt={material.title} className="object-cover h-full w-full" />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">{material.title}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{material.description}</p>
          </div>
          <div className="ml-3">
            {material.accessLevel === "purchased" ? (
              <Badge className="bg-yellow-50 text-yellow-800">VIP</Badge>
            ) : (
              <Badge className="bg-green-50 text-green-800">Free</Badge>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {material.subject ?? "Tài liệu chung"} • {material.grade ?? "Tất cả khối"}
          </div>

          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="px-3 py-1 flex items-center gap-2">
                  <FileText size={14} /> Xem trước
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-0">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="text-lg font-semibold">{material.title}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  {material.previewUrl ? (
                    // For simple preview show image or embed via iframe if it's a PDF (demo)
                    material.previewUrl.endsWith(".pdf") ? (
                      <iframe src={material.previewUrl} title={material.title} className="w-full h-[60vh]" />
                    ) : (
                      <img src={material.previewUrl} alt={material.title} className="w-full h-auto" />
                    )
                  ) : (
                    <div className="text-sm text-gray-600">Không có bản xem trước.</div>
                  )}
                  <div className="mt-4 flex justify-end">
                    {hasAccess ? (
                      <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                        <Download size={14} />
                        <span className="ml-2">Tải xuống</span>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={material.courseId ? `/courses-v2/${material.courseId}` : "/courses"} onClick={() => {}}>
                          <Lock size={14} />
                          <span className="ml-2">Chỉ dành cho học viên đã mua</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              className="px-3 py-1"
              onClick={handleDownload}
              disabled={!hasAccess}
              variant={hasAccess ? "default" : "ghost"}
            >
              <Download size={14} />
              <span className="ml-2">Tải</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;