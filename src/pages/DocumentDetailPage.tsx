"use client";

import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import Footer from "@/components/layout/Footer";
import { ALL_DOCS } from "@/data/docsData";
import DocumentHero from "@/components/document/DocumentHero";
import DocumentContent from "@/components/document/DocumentContent";
import DocumentSidebar from "@/components/document/DocumentSidebar";

const DocumentDetailPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const doc = ALL_DOCS.find((d) => d.id === docId);

  if (!doc) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <BreadcrumbNav courseTitle="Tài liệu" />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Tài liệu không tìm thấy</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle={doc.title} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <DocumentHero doc={doc} />
            <DocumentContent doc={doc} />
          </div>

          <div className="lg:col-span-4">
            <DocumentSidebar doc={doc} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentDetailPage;