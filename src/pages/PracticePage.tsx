"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ExamFilters from "@/components/exam/ExamFilters";
import ExamList from "@/components/exam/ExamList";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const PracticePage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Thi thử" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Danh sách đề thi</h1>
            <p className="text-sm text-gray-500">Chọn đề phù hợp để luyện tập, làm quen cấu trúc đề và kiểm tra năng lực.</p>
          </div>

          {/* Mobile: Filter button opens Sheet */}
          <div className="md:hidden">
            <Button
              className="flex items-center space-x-2"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={16} />
              <span>Bộ lọc</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar on large screens */}
          <div className="hidden lg:block lg:col-span-3">
            <ExamFilters />
          </div>

          {/* Main list */}
          <div className="lg:col-span-9">
            <div className="mt-0">
              <ExamList />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sheet for filters */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="right" className="w-full sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Bộ lọc đề thi</SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            <ExamFilters />
          </div>

          <div className="p-4">
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                Đóng
              </Button>
              {/* The SheetClose/trigger is redundant here; keep explicit close */}
              <SheetClose asChild>
                <Button onClick={() => setIsFilterOpen(false)}>Áp dụng</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default PracticePage;