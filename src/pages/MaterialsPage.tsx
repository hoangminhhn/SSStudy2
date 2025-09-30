"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import MaterialsFilters, { MaterialsFiltersState } from "@/components/materials/MaterialsFilters";
import MaterialGrid from "@/components/materials/MaterialGrid";
import { useCurrentUser } from "@/hooks/use-user";

const MaterialsPage: React.FC = () => {
  const user = useCurrentUser();
  const [filters, setFilters] = React.useState<MaterialsFiltersState>({
    search: "",
    subject: null,
    grade: null,
    category: null,
    onlyVIP: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Tài liệu" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <MaterialsFilters value={filters} onChange={setFilters} />
            <div className="mt-4 text-xs text-gray-500">
              <div>Hiện tại bạn đang: {user.isLoggedIn ? `${user.name}` : "Khách (chưa đăng nhập)"}</div>
              <div className="mt-2">Khóa đã mua (demo): {user.purchasedCourseIds.join(", ") || "Chưa mua khóa nào"}</div>
            </div>
          </aside>

          <section className="lg:col-span-9">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kho tài liệu</h1>
            <p className="text-sm text-gray-600 mb-6">
              Tài liệu miễn phí và VIP dành cho học viên đã mua khóa học tương ứng. Chọn bộ lọc để thu hẹp kết quả.
            </p>

            <MaterialGrid filters={filters} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MaterialsPage;