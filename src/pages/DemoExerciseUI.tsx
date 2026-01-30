"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import LessonHero from "@/components/lesson/LessonHero";
import LessonVideoPlayer from "@/components/lesson/LessonVideoPlayer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { Play } from "lucide-react";

type Tab = {
  id: string;
  title: string;
  subtitle: string;
};

const TABS: Tab[] = [
  { id: "PA1", title: "PA1", subtitle: "Sticky + Sheet" },
  { id: "PA2", title: "PA2", subtitle: "Accordion" },
  { id: "PA3", title: "PA3", subtitle: "Tabs" },
  { id: "PA4", title: "PA4", subtitle: "FAB + Sheet" },
  { id: "PA5", title: "PA5", subtitle: "Peek Drawer" },
];

const DemoExerciseUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("PA1");

  const handleStartExercise = (tabId: string) => {
    showSuccess(`[${tabId}] Bắt đầu làm bài (demo) — đây là hành động mẫu.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-blue-400" />
            <h1 className="text-lg font-semibold">Demo UI Bài tập</h1>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {TABS.map((t) => {
              const active = t.id === activeTab;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    active
                      ? "bg-blue-600 text-white shadow"
                      : "bg-slate-800 text-slate-200/90 hover:bg-slate-700"
                  }`}
                  aria-pressed={active}
                >
                  <span className="font-medium">{t.title}</span>
                  <Badge className={active ? "bg-white/20 text-white" : "bg-slate-700 text-slate-200"}>
                    {t.subtitle}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <BreadcrumbNav courseTitle="Demo UI Bài Tập" />

        {/* Content: clone of lesson-detail style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8 space-y-6">
            {/* Video / hero */}
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <LessonVideoPlayer
                  rootId={`demo-video-${activeTab}`}
                  lessonTitle={`[${activeTab}] Ví dụ video / thumbnail`}
                  updatedDate="Cập nhật: 07/07/2025"
                  showAddNoteButton={false}
                />
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleStartExercise(activeTab)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-3 flex items-center gap-2"
                  >
                    <Play size={16} />
                    Làm bài
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => showSuccess(`[${activeTab}] Lưu tiến trình (demo)`)}
                    className="rounded-full px-4 py-2"
                  >
                    Lưu tiến trình
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => showSuccess(`[${activeTab}] Tải đề (demo)`)}
                    className="rounded-full px-4 py-2"
                  >
                    Tải đề
                  </Button>
                </div>
              </div>
            </Card>

            {/* Lesson Hero (info) */}
            <LessonHero lessonTitle={`Bài mẫu - ${activeTab}`} teacherName="Thầy Nguyễn Tiến Đạt" viewsRemaining={5} />

            {/* Extra test area: variant message so you can confirm tab change */}
            <Card className="p-4">
              <div className="text-sm text-gray-700">
                Bạn đang xem: <span className="font-semibold">{activeTab}</span> — chế độ: <span className="italic">{TABS.find(t => t.id === activeTab)?.subtitle}</span>
              </div>
            </Card>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Thông tin nhanh</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <div><span className="font-medium">Khóa:</span> Master Demo</div>
                <div><span className="font-medium">Giảng viên:</span> Thầy Nguyễn Tiến Đạt</div>
                <div><span className="font-medium">Trạng thái:</span> Đang mở</div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Hành động nhanh</h4>
              <div className="flex flex-col gap-3">
                <Button onClick={() => handleStartExercise(activeTab)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                  Làm bài (một lần nữa)
                </Button>
                <Button variant="outline" onClick={() => showSuccess("Gửi phản hồi (demo)")}>
                  Gửi phản hồi
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DemoExerciseUI;