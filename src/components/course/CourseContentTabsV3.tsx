"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { chapters, Session as ChapterSession, TimeSlot } from "@/data/courseData";
import { Link } from "react-router-dom";
import { isToday, parse } from "date-fns";
import { showSuccess, showError } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface CourseContentTabsV3Props {
  courseId: string;
}

interface Lesson {
  id: string;
  title: string;
  status: "free" | "pro";
  duration: string;
  locked: boolean;
  type?: 'normal' | 'livestream';
  date: string;
  timeSlots?: TimeSlot[];
}

interface Session {
  id: string;
  title: string;
  subject: string;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

const LIVESTREAM_COMMON_CLASSES = "h-7 px-3 rounded-full text-xs font-semibold flex items-center justify-center whitespace-nowrap select-none";

const LIVESTREAM_BADGE_CLASSES = LIVESTREAM_COMMON_CLASSES + " bg-red-600 text-white";

const LIVESTREAM_BUTTON_BASE_CLASSES = LIVESTREAM_COMMON_CLASSES + " transition-colors duration-200";

// Fixed subject tabs requested by the user
const SUBJECTS = ["Văn", "Anh", "Lịch Sử", "Địa Lý", "Hóa Học"];

const CourseContentTabsV3: React.FC<CourseContentTabsV3Props> = ({ courseId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>(SUBJECTS[0]); // Default to first subject (Văn)

  // Khai báo freeLessonsTitles ở đây để dùng trong render
  const freeLessonsTitles = [
    "Buổi 1: Tổng ôn lượng giác (phần 1)",
    "Buổi 5: Tổng ôn PT, BPT mũ loga",
  ];

  // Map chapters to courseContent structure and include subject
  const courseContent: Session[] = chapters.map((chapter, chapterIndex) => {
    const [completed, total] = chapter.progress.split('/').map(Number);

    return {
      id: chapter.id,
      title: chapter.title,
      subject: chapter.subject || "Khác",
      completedLessons: completed,
      totalLessons: total,
      lessons: chapter.sessions.map((session: ChapterSession, sessionIndex) => {
        const isFreeLesson = freeLessonsTitles.includes(session.title);
        const isFirstLessonOfFirstChapter = chapterIndex === 0 && sessionIndex === 0;

        let status: "free" | "pro" = "pro";
        let locked = true;

        if (isFreeLesson || isFirstLessonOfFirstChapter) {
          status = "free";
          locked = false;
        }

        return {
          id: session.sessionId,
          title: session.title,
          status: status,
          duration: "45:00",
          locked: locked,
          type: session.type,
          date: session.date,
          timeSlots: session.timeSlots,
        };
      }),
    };
  });

  // Filter by selected subject first (chapter-level), then apply search on lessons and chapter title
  const filteredContent = useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    // Chapter-level filtering by selectedSubject (only show chapters whose subject matches)
    const subjectFiltered = courseContent.filter((c) => c.subject === selectedSubject);

    // Search filtering inside each remaining chapter
    return subjectFiltered
      .map((session) => {
        if (!lowerSearch) return session;

        const chapterMatches = session.title.toLowerCase().includes(lowerSearch);

        const filteredLessons = session.lessons.filter((lesson) =>
          lesson.title.toLowerCase().includes(lowerSearch)
        );

        // If chapter matches, keep all lessons; otherwise keep only filtered lessons
        return chapterMatches ? session : { ...session, lessons: filteredLessons };
      })
      .filter((session) => session.lessons.length > 0 || session.title.toLowerCase().includes(lowerSearch));
  }, [courseContent, searchTerm, selectedSubject]);

  return (
    <Card className="p-6 shadow-lg rounded-lg mt-8">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="flex justify-start border-b border-gray-200 mb-4 bg-white p-0 h-auto">
          <TabsTrigger
            value="content"
            className="relative px-4 py-3 text-base font-medium text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none hover:text-gray-900 transition-colors duration-200"
          >
            Nội dung khóa học
          </TabsTrigger>
          <TabsTrigger
            value="teacher"
            className="relative px-4 py-3 text-base font-medium text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none hover:text-gray-900 transition-colors duration-200"
          >
            Giáo viên
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="relative px-4 py-3 text-base font-medium text-gray-700 data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none hover:text-gray-900 transition-colors duration-200"
          >
            Đánh giá
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Tìm kiếm đề thi - bài học ở đây"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Fixed Subject category tabs */}
          <div className="mb-4">
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {SUBJECTS.map((subj) => {
                const active = subj === selectedSubject;
                return (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    aria-pressed={active}
                    className={cn(
                      "whitespace-nowrap px-4 py-2 rounded-md border transition-colors text-sm flex-shrink-0",
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredContent.length > 0 ? (
              filteredContent.map((session) => (
                <AccordionItem key={session.id} value={session.id} className="border-b border-gray-200 last:border-b-0">
                  <AccordionTrigger className="flex itemscenter justify-between py-4 text-base font-semibold text-gray-800 hover:no-underline hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center flex-grow">
                      <span className="ml-2">{session.title}</span>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      Hoàn thành {session.completedLessons}% {session.completedLessons}/{session.totalLessons} Bài giảng
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-0">
                    <div className="pl-6 pr-2 py-2 space-y-3">
                      {session.lessons.map((lesson) => {
                        const sessionDate = parse(lesson.date, 'dd/MM/yyyy', new Date());
                        const isLiveToday = lesson.type === 'livestream' && isToday(sessionDate);
                        const displayTime = lesson.type === 'livestream' && lesson.timeSlots && lesson.timeSlots.length > 0
                          ? lesson.timeSlots[0].time
                          : '';

                        let buttonContent = null;
                        if (lesson.type === 'livestream') {
                          if (isLiveToday) {
                            buttonContent = (
                              <Link to={`/lesson/${lesson.id}`}>
                                <Button
                                  className={`${LIVESTREAM_BUTTON_BASE_CLASSES} bg-v3-primary hover:bg-v3-primary/90 text-v3-primary-foreground`}
                                >
                                  Vào học
                                </Button>
                              </Link>
                            );
                          } else if (lesson.timeSlots) {
                            const hasRegisterSlot = lesson.timeSlots.some(slot => slot.registrationStatus === 'register');
                            const hasRegisteredSlot = lesson.timeSlots.some(slot => slot.registrationStatus === 'registered');

                            if (hasRegisterSlot) {
                              buttonContent = (
                                <Button
                                  className={`${LIVESTREAM_BUTTON_BASE_CLASSES} bg-v3-secondary hover:bg-v3-secondary/90 text-v3-background`}
                                  onClick={() => showSuccess("Đăng ký học livestream thành công, bạn hãy truy cập buổi học vào ngày học chính thức nhé!")}
                                >
                                  Đăng Ký học
                                </Button>
                              );
                            } else if (hasRegisteredSlot) {
                              buttonContent = (
                                <Button
                                  className={`${LIVESTREAM_BUTTON_BASE_CLASSES} bg-gray-400 text-gray-700 cursor-default`}
                                  onClick={() => showError("Bài học livestream sẽ được mở vào giờ và ngày học chính thức")}
                                >
                                  Đã đăng ký
                                </Button>
                              );
                            } else {
                              buttonContent = (
                                <Button
                                  className={`${LIVESTREAM_BUTTON_BASE_CLASSES} bg-red-600 text-white`}
                                  onClick={() => showError("Vui lòng liên hệ bộ phận chăm sóc khách hàng để được hướng dẫn")}
                                >
                                  Hết chỗ
                                </Button>
                              );
                            }
                          }
                        }

                        return (
                          <div key={lesson.id} className="flex items-center justify-between py-1">
                            <div className="flex flex-col flex-grow pr-4">
                              <div className="flex items-center space-x-2">
                                <Link
                                  to={lesson.type === 'livestream' ? `/lesson/${lesson.id}` : `/lesson-v2/${lesson.id}`}
                                  className="text-gray-800 hover:text-blue-600 font-medium text-sm transition-colors duration-200 truncate"
                                >
                                  {lesson.title}
                                </Link>
                                {lesson.type === 'livestream' && (
                                  <Badge variant="destructive" className="bg-red-500 text-white px-2 py-0.5 text-xs font-semibold flex-shrink-0">
                                    Livestream
                                  </Badge>
                                )}
                              </div>
                              {lesson.type === 'livestream' && (
                                <span className="text-xs text-gray-500 mt-0.5">
                                  Ngày: {lesson.date} {displayTime && `- ${displayTime}`}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0 min-w-[140px] justify-end">
                              {lesson.type !== 'livestream' && (
                                <div className="flex items-center space-x-2">
                                  <span
                                    className={cn(
                                      "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap min-w-[48px] text-center",
                                      lesson.status === "free"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    )}
                                  >
                                    {lesson.status === "free" ? "Free" : "Pro"}
                                  </span>
                                  <span className="text-xs text-gray-500 w-[45px] text-right whitespace-nowrap">
                                    {lesson.duration}
                                  </span>
                                  <div className="w-5 flex justify-center items-center">
                                    {lesson.status === "pro" && lesson.locked ? (
                                      <Lock size={14} color="#000000" />
                                    ) : (
                                      <div className="w-4" />
                                    )}
                                  </div>
                                </div>
                              )}
                              {buttonContent}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">Không tìm thấy bài học hoặc chương nào phù hợp.</p>
            )}
          </Accordion>
        </TabsContent>

        <TabsContent value="teacher">
          <div className="p-4 text-gray-600">Thông tin về giáo viên sẽ được hiển thị tại đây.</div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="p-4 text-gray-600">Các đánh giá khóa học sẽ được hiển thị tại đây.</div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CourseContentTabsV3;