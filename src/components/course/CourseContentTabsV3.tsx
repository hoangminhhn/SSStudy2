"use client";

import React, { useState } from "react";
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
import { chapters, Session as ChapterSession, TimeSlot } from "@/data/courseData"; // Import Session and TimeSlot from courseData
import { Link } from "react-router-dom";
import { isToday, parse } from 'date-fns'; // Import date-fns utilities
import { showSuccess, showError } from "@/utils/toast"; // Import toast utilities
import { Button } from "@/components/ui/button"; // Import Button component

interface CourseContentTabsV3Props {
  courseId: string;
}

interface Lesson {
  id: string;
  title: string;
  status: "free" | "pro";
  duration: string;
  locked: boolean;
  // Add properties from ChapterSession that are relevant for display/logic
  type?: 'normal' | 'livestream';
  date: string;
  timeSlots?: TimeSlot[];
}

interface Session {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

const CourseContentTabsV3: React.FC<CourseContentTabsV3Props> = ({ courseId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const courseContent: Session[] = chapters.map((chapter, chapterIndex) => {
    const [completed, total] = chapter.progress.split('/').map(Number);

    return {
      id: chapter.id,
      title: chapter.title,
      completedLessons: completed,
      totalLessons: total,
      lessons: chapter.sessions.map((session: ChapterSession, sessionIndex) => { // Explicitly type session
        const isFirstLessonOfFirstChapter = chapterIndex === 0 && sessionIndex === 0;
        const status = isFirstLessonOfFirstChapter ? "free" : "pro";
        const locked = !isFirstLessonOfFirstChapter;

        return {
          id: session.sessionId,
          title: session.title,
          status: status,
          duration: "45:00", // Placeholder, as duration is not in original data
          locked: locked,
          type: session.type, // Pass type
          date: session.date, // Pass date
          timeSlots: session.timeSlots, // Pass timeSlots
        };
      }),
    };
  });

  const filteredContent = courseContent.filter(session => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const sessionTitleMatches = session.title.toLowerCase().includes(lowerCaseSearchTerm);

    const hasMatchingLessons = session.lessons.some(lesson =>
      lesson.title.toLowerCase().includes(lowerCaseSearchTerm)
    );

    return sessionTitleMatches || hasMatchingLessons;
  }).map(session => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredLessons = session.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const lessonsToDisplay = session.title.toLowerCase().includes(lowerCaseSearchTerm)
      ? session.lessons
      : filteredLessons;

    return {
      ...session,
      lessons: lessonsToDisplay,
    };
  }).filter(session => session.lessons.length > 0 || session.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Card className="p-6 shadow-lg rounded-lg mt-8">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="flex justify-start border-b border-gray-200 mb-6 bg-white p-0 h-auto">
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
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Tìm kiếm đề thi - bài học ở đây"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredContent.length > 0 ? (
              filteredContent.map((session) => (
                <AccordionItem key={session.id} value={session.id} className="border-b border-gray-200 last:border-b-0">
                  <AccordionTrigger className="flex items-center justify-between py-4 text-base font-semibold text-gray-800 hover:no-underline hover:bg-gray-100 transition-colors duration-200">
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
                        if (isLiveToday) {
                          buttonContent = (
                            <Link to={`/lesson/${lesson.id}`}>
                              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-sm">
                                Vào học
                              </Button>
                            </Link>
                          );
                        } else if (lesson.type === 'livestream' && lesson.timeSlots) {
                          const hasRegisterSlot = lesson.timeSlots.some(slot => slot.registrationStatus === 'register');
                          const hasRegisteredSlot = lesson.timeSlots.some(slot => slot.registrationStatus === 'registered');

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
                          <div key={lesson.id} className="flex items-center justify-between py-2">
                            <div className="flex flex-col flex-grow pr-4">
                              <Link to={`/lesson-v2/${lesson.id}`} className="text-gray-800 hover:text-blue-600 font-medium text-sm transition-colors duration-200">
                                {lesson.title}
                              </Link>
                              {lesson.type === 'livestream' && displayTime && (
                                <span className="text-xs text-gray-500 mt-1 ml-0">Livestream ({lesson.date} - {displayTime})</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              {lesson.type === 'livestream' ? (
                                buttonContent
                              ) : (
                                <>
                                  {lesson.status === "free" ? (
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold min-w-[40px] text-center">
                                      Free
                                    </span>
                                  ) : (
                                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold min-w-[40px] text-center">
                                      Pro
                                    </span>
                                  )}
                                  <div className="flex items-center">
                                    <span className="text-gray-500 text-sm w-[45px] text-right">
                                      {lesson.duration}
                                    </span>
                                    <div className="w-6 flex justify-center items-center">
                                      {lesson.locked && <Lock size={16} className="text-gray-400" />}
                                    </div>
                                  </div>
                                </>
                              )}
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