"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Play, User, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { isToday, parse } from "date-fns";
import { Link } from "react-router-dom";
import { chapters, Chapter, Session, TimeSlot } from "@/data/courseData";
import { showSuccess, showError } from "@/utils/toast"; // Import toast utilities
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CourseContentProps {
  isSidebar?: boolean;
}

const CourseContent: React.FC<CourseContentProps> = ({ isSidebar = false }) => {
  const [openChapters, setOpenChapters] = React.useState<string[]>([]);
  const today = new Date();

  const handleAccordionChange = (values: string[]) => {
    setOpenChapters(values);
  };

  // --- New: search & subject tabs for sidebar ---
  const [searchTerm, setSearchTerm] = useState("");
  const subjects = useMemo(() => {
    const s = Array.from(new Set(chapters.map((c) => c.subject || "Khác")));
    return s;
  }, []);

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Filter chapters based on selected subject and search term (search applied to chapter title + lesson titles)
  const filteredChapters = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return chapters
      .filter((ch) => (selectedSubject ? ch.subject === selectedSubject : true))
      .map((ch) => {
        if (!q) return ch;
        const chapterMatches = ch.title.toLowerCase().includes(q);
        const filteredSessions = ch.sessions.filter((s) => s.title.toLowerCase().includes(q));
        return chapterMatches ? ch : { ...ch, sessions: filteredSessions };
      })
      .filter((ch) => ch.sessions.length > 0 || ch.title.toLowerCase().includes(q));
  }, [searchTerm, selectedSubject]);

  // --- New: horizontal tabs scroll + arrow visibility + drag-to-scroll ---
  const tabContainerRef = useRef<HTMLDivElement | null>(null);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const updateArrowVisibility = () => {
    const el = tabContainerRef.current;
    if (!el) {
      setShowRightArrow(false);
      return;
    }
    setShowRightArrow(el.scrollWidth > el.clientWidth + 4);
  };

  useEffect(() => {
    updateArrowVisibility();
    const handleResize = () => updateArrowVisibility();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [subjects, selectedSubject, searchTerm]);

  const handleTabScroll = () => updateArrowVisibility();

  const scrollTabsBy = (amount: number) => {
    const el = tabContainerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
    // after scroll, update arrow visibility with a small delay
    setTimeout(updateArrowVisibility, 250);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    dragState.current.active = true;
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = el.scrollLeft;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = tabContainerRef.current;
    if (!el || !dragState.current.active) return;
    const x = e.clientX;
    const walk = x - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - walk;
    updateArrowVisibility();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = tabContainerRef.current;
    if (!el) return;
    dragState.current.active = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    el.classList.remove("cursor-grabbing");
  };

  // Helper: get chapters to render (use filteredChapters when in sidebar, else full chapters)
  const chaptersToRender: Chapter[] = isSidebar ? filteredChapters : chapters;

  return (
    <div className={isSidebar ? "" : "mt-8"}>
      {!isSidebar && (
        <>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">BÀI HỌC</h2>
          <p className="text-gray-700 mb-6">
            Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
          </p>
        </>
      )}

      {isSidebar && (
        <div className="mb-4">
          {/* Quick search input */}
          <div className="mb-3">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm đề thi - bài học ở đây"
              className="w-full"
            />
          </div>

          {/* Horizontal subject tabs with drag-to-scroll and right arrow */}
          <div className="relative">
            <div
              ref={tabContainerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onScroll={handleTabScroll}
              className="flex space-x-2 overflow-x-auto no-scrollbar py-1 px-1 touch-pan-x"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {subjects.map((subj) => {
                const active = subj === selectedSubject;
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject((prev) => (prev === subj ? null : subj))}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-md text-sm border",
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    )}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>

            {/* Right arrow when overflow */}
            {showRightArrow && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-auto">
                <Button
                  onClick={() => {
                    const el = tabContainerRef.current;
                    if (!el) return;
                    // scroll roughly by 60% of visible width
                    scrollTabsBy(Math.round(el.clientWidth * 0.6));
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <Accordion type="multiple" value={openChapters} onValueChange={handleAccordionChange} className="w-full space-y-4">
        {chaptersToRender.map((chapter) => {
          const isOpen = openChapters.includes(chapter.id);
          return (
            <Card key={chapter.id} className="p-4 shadow-sm rounded-lg">
              <AccordionItem value={chapter.id} className="border-b-0">
                <AccordionTrigger className="flex items-center justify-between w-full text-left font-medium text-gray-800 hover:no-underline p-0 [&>svg]:hidden">
                  <div className="flex items-center space-x-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">
                      {chapter.progress}
                    </span>
                    <span className="text-orange-600 font-semibold">{chapter.title}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 rounded-full px-4 py-2"
                  >
                    {isOpen ? "Ẩn" : "Xem"} <FileText size={16} className="ml-2" />
                  </Button>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0">
                  <div className="space-y-3 pl-4 border-l-2 border-gray-200 ml-6">
                    {chapter.sessions.map((session, sessionIndex) => {
                      const sessionDate = parse(session.date, 'dd/MM/yyyy', new Date());
                      const isLiveToday = session.type === 'livestream' && isToday(sessionDate);
                      const displayTime = session.type === 'livestream' && session.timeSlots && session.timeSlots.length > 0
                        ? session.timeSlots[0].time
                        : '';

                      let buttonContent = null;
                      if (isLiveToday) {
                        buttonContent = (
                          <Link to={`/lesson/${session.sessionId}`}>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-sm">
                              Vào học
                            </Button>
                          </Link>
                        );
                      } else if (session.type === 'livestream' && session.timeSlots) {
                        const hasRegisterSlot = session.timeSlots.some(slot => slot.registrationStatus === 'register');
                        const hasRegisteredSlot = session.timeSlots.some(slot => slot.registrationStatus === 'registered');

                        if (hasRegisterSlot) {
                          buttonContent = (
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm"
                              onClick={() => showSuccess("Đăng ký học livestream thành công, bạn hãy truy cập buổi học vào ngày học chính thức nhé!")}
                            >
                              Đăng Ký học
                            </Button>
                          );
                        } else if (hasRegisteredSlot) {
                          buttonContent = (
                            <Button
                              className="bg-gray-400 text-gray-700 rounded-full px-4 py-2 text-sm"
                              onClick={() => showError("Bài học livestream sẽ được mở vào giờ và ngày học chính thức")}
                            >
                              Đã đăng ký
                            </Button>
                          );
                        } else {
                          buttonContent = (
                            <Button
                              className="bg-red-600 text-white rounded-full px-4 py-2 text-sm"
                              onClick={() => showError("Vui lòng liên hệ bộ phận chăm sóc khách hàng để được hướng dẫn")}
                            >
                              Hết chỗ
                            </Button>
                          );
                        }
                      }

                      return (
                        <div key={session.sessionId} className="flex justify-between items-start py-2">
                          {/* Left Section: Icon, Title, Livestream Badge */}
                          <div className="flex flex-col flex-grow pr-4">
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                              {session.type === 'livestream' ? (
                                <Play size={18} className="text-orange-500 flex-shrink-0" />
                              ) : (
                                <FileText size={18} className="text-orange-500 flex-shrink-0" />
                              )}
                              <Link
                                to={`/lesson/${session.sessionId}`}
                                className="text-gray-800 hover:underline font-medium"
                                id={sessionIndex === 0 && chapter.id === "chapter-1" ? "tour-first-lesson-item" : undefined}
                              >
                                {session.title}
                              </Link>
                            </div>
                            {session.type === 'livestream' && session.timeSlots && session.timeSlots.length > 0 && (
                              <Badge variant="destructive" className="bg-red-500 text-white px-4 py-2 ml-8 mt-1 w-fit">
                                Livestream {displayTime && `(${displayTime})`}
                              </Badge>
                            )}
                          </div>

                          {/* Right Section: Date and Button */}
                          <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                            <span className="text-gray-500 text-sm">
                              Ngày: {session.date}
                            </span>
                            {buttonContent}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CourseContent;