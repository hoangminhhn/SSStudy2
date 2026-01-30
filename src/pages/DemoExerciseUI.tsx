"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play } from "lucide-react";
import { Link } from "react-router-dom";

const DemoExerciseUI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Demo UI Bài Tập" />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Demo UI Bài Tập</h1>

        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Giao diện thử nghiệm</h2>
              <p className="text-sm text-gray-600 mt-2">
                Đây là trang demo để kiểm tra các nút và UI liên quan đến phần "Làm bài tập". Bạn có thể dùng
                các nút bên dưới để mô phỏng hành động.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2">
                Bắt đầu làm bài <Play size={16} className="ml-2" />
              </Button>
              <Link to="/courses" className="inline-flex">
                <Button variant="outline" className="rounded-full px-4 py-2">
                  Quay về Khóa học <BookOpen size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-medium mb-2 text-gray-800">Mô phỏng nút làm bài</h3>
            <p className="text-sm text-gray-600 mb-4">Nút này sẽ được kết nối với chức năng 'Làm bài' sau khi bạn xác định hành vi mong muốn.</p>
            <div>
              <Button onClick={() => alert("Nút 'Làm bài' (demo) được nhấn")} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2">
                Nhấn để thử
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-2 text-gray-800">Các trạng thái nút</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button className="bg-blue-600 text-white rounded-full px-4 py-2">Bình thường</Button>
                <Button variant="outline" className="rounded-full px-4 py-2">Outline</Button>
              </div>
              <div className="flex gap-3">
                <Button disabled className="rounded-full px-4 py-2">Disabled</Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-4 py-2">Warning</Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DemoExerciseUI;