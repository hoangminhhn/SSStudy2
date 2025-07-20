"use client";

import React from "react";
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
import { chapters } from "@/data/courseData";
import { Link } from "react-router-dom";

interface CourseContentTabsV3Props {
  courseId: string;
}

interface Lesson {
  id: string;
  title: string;
  status: "free" | "pro";
  duration: string;
  locked: boolean;
}

interface Session {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

const CourseContentTabsV3: React.FC<CourseContentTabsV3Props> = ({ courseId }) => {
  const courseContent: Session[] = chapters.map((chapter, chapterIndex) => {
    const [completed, total] = chapter.progress.split('/').map(Number);

    return {
      id: chapter.id,
      title: chapter.title,
      completedLessons: completed,
      totalLessons: total,
      lessons: chapter.sessions.map((session, sessionIndex) => {
        const isFirstLessonOfFirstChapter = chapterIndex === 0 && sessionIndex === 0;
        const status = isFirstLessonOfFirstChapter ? "free" : "pro";
        const locked = !isFirstLessonOfFirstChapter;

        return {
          id: session.sessionId,
          title: session.title,
          status: status,
          duration: "45:00",
          locked: locked,
        };
      }),
    };
  });

  return (
    <Card className="p-6 shadow-lg rounded-lg mt-8 bg-v3-background border-v3-border">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="flex justify-start border-b border-v3-border mb-6 bg-v3-background p-0 h-auto">
          <TabsTrigger
            value="content"
            className="relative px-4 py-3 text-base font-medium text-v3-text-muted data-[state=active]:text-v3-text-default data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-v3-primary data-[state=active]:shadow-none rounded-none hover:text-v3-text-default transition-colors duration-200"
          >
            Nội dung khóa học
          </TabsTrigger>
          <TabsTrigger
            value="teacher"
            className="relative px-4 py-3 text-base font-medium text-v3-text-muted data-[state=active]:text-v3-text-default data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-v3-primary data-[state=active]:shadow-none rounded-none hover:text-v3-text-default transition-colors duration-200"
          >
            Giáo viên
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="relative px-4 py-3 text-base font-medium text-v3-text-muted data-[state=active]:text-v3-text-default data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-v3-primary data-[state=active]:shadow-none rounded-none hover:text-v3-text-default transition-colors duration-200"
          >
            Đánh giá
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-v3-text-muted" size={20} />
            <Input
              type="text"
              placeholder="Tìm kiếm đề thi - bài học ở đây"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-v3-border focus:outline-none focus:ring-2 focus:ring-v3-primary"
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {courseContent.map((session) => (
              <AccordionItem key={session.id} value={session.id} className="border-b border-v3-border last:border-b-0">
                <AccordionTrigger className="flex items-center justify-between py-4 text-base font-semibold text-v3-text-default hover:no-underline hover:bg-v3-background transition-colors duration-200">
                  <div className="flex items-center flex-grow">
                    <span className="ml-2">{session.title}</span>
                  </div>
                  <span className="text-sm text-v3-text-muted flex-shrink-0">
                    Hoàn thành {session.completedLessons}% {session.completedLessons}/{session.totalLessons} Bài giảng
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-0">
                  <div className="pl-6 pr-2 py-2 space-y-3">
                    {session.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <Link to={`/lesson-v2/${lesson.id}`} className="text-v3-text-default hover:text-v3-primary font-medium text-sm transition-colors duration-200">
                            {lesson.title}
                          </Link>
                        </div>
                        <div className="flex items-center space-x-2">
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
                            <span className="text-v3-text-muted text-sm w-[45px] text-right">
                              {lesson.duration}
                            </span>
                            <div className="w-6 flex justify-center items-center">
                              {lesson.locked && <Lock size={16} className="text-v3-text-muted" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="teacher">
          <div className="p-4 text-v3-text-muted">Thông tin về giáo viên sẽ được hiển thị tại đây.</div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="p-4 text-v3-text-muted">Các đánh giá khóa học sẽ được hiển thị tại đây.</div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CourseContentTabsV3;