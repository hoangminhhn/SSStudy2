"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import DocumentsLayout from "@/components/docs/DocumentsLayout";

const DocumentsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Tài liệu" bgColor="white" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Trang Tài liệu</h1>
            <p className="text-sm text-gray-600 mt-1">
              Tìm kiếm, lọc và truy cập tài liệu miễn phí hoặc tài liệu thuộc về các khóa bạn đã đăng ký.
            </p>
          </header>

          <DocumentsLayout purchased={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentsPage;