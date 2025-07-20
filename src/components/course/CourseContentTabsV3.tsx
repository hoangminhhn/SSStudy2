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
import { chapters, Session as ChapterSession, TimeSlot } from "@/data/courseData";
import { Link } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";
import { Button } from "@/components/ui/button";

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
      lessons: chapter.sessions.map((session: ChapterSession, sessionIndex) => {
        // Gán status và locked cho bài "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất"
        const isFreeLesson = session.title === "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất";

        const isFirstLessonOfFirstChapter = chapterIndex === 0 && sessionIndex === 0;
        const status = isFreeLesson ? "free" : (isFirstLessonOfFirstChapter ? "free" : "pro");
        const locked = isFreeLesson ? false : !isFirstLessonOfFirstChapter;

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
                      {session.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between py-1">
                          <Link
                            to={`/lesson-v2/${lesson.id}`}
                            className="text-gray-800 hover:text-blue-600 font-medium text-sm transition-colors duration-200 truncate max-w-[70%]"
                          >
                            {lesson.title}
                          </Link>
                          <div className="flex items-center space-x-2">
                            {lesson.status === "free" ? (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                Free
                              </span>
                            ) : (
                              <>
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                  Pro
                                </span>
                                {lesson.locked && <Lock size={16} className="text-gray-400" />}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
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