"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import LessonDetailPageV2Clone from "./LessonDetailPageV2Clone";
import { MemoryRouter, Routes, Route } from "react-router-dom";

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
        <BreadcrumbNav courseTitle="Demo UI Bài Tập" />

        {/* Content area */}
        <div className="mt-6">
          {activeTab === "PA1" ? (
            // Provide a MemoryRouter so the cloned page receives the lessonId param
            <div className="bg-white border rounded-md">
              <MemoryRouter initialEntries={["/lesson-v2/buoi-1-tong-on-luong-giac-phan-1"]}>
                <Routes>
                  <Route path="/lesson-v2/:lessonId" element={<LessonDetailPageV2Clone />} />
                </Routes>
              </MemoryRouter>
            </div>
          ) : (
            <div className="bg-white border rounded-md min-h-[320px]" aria-live="polite" aria-atomic="true">
              {/* Intentionally blank - will be filled per your instructions */}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DemoExerciseUI;