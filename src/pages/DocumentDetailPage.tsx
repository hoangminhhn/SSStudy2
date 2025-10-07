"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { ALL_DOCS, Doc } from "@/data/docsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DocumentDetailPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const doc: Doc | undefined = ALL_DOCS.find((d) => d.id === docId);

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <BreadcrumbNav courseTitle="Tài liệu" />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Tài liệu không tìm thấy</h2>
            <p className="text-gray-600 mb-6">Tài liệu bạn yêu cầu không tồn tại hoặc đã bị gỡ.</p>
            <Link to="/tai-lieu">
              <Button variant="outline">Quay lại trang Tài liệu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle={doc.title} />
      <main className="flex-grow container mx-auto px-4 py-12">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{doc.title}</h1>
              <div className="text-sm text-gray-500 mt-2">
                {doc.subject} {doc.course ? `• ${doc.course}` : ""} {doc.grade ? `• ${doc.grade}` : ""} {doc.category ? `• ${doc.category}` : ""}
              </div>

              <p className="mt-4 text-gray-700">{doc.summary ?? "Không có mô tả chi tiết."}</p>

              <div className="mt-6 flex items-center gap-3">
                {doc.url ? (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button>
                      Tải / Mở tài liệu <Download className="ml-2" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" disabled>
                    Tài liệu chưa sẵn sàng
                  </Button>
                )}

                <Link to="/tai-lieu" className="ml-2">
                  <Button variant="ghost">Quay lại danh sách</Button>
                </Link>
              </div>
            </div>

            <aside className="w-full md:w-64">
              <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <div className="text-sm text-gray-600 mb-2">Thông tin nhanh</div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>Miễn phí:</strong> {doc.free ? "Có" : "Không"}</li>
                  <li><strong>Môn:</strong> {doc.subject}</li>
                  <li><strong>Khóa:</strong> {doc.course ?? "—"}</li>
                  <li><strong>Loại:</strong> {doc.category ?? "—"}</li>
                </ul>
              </div>
            </aside>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentDetailPage;