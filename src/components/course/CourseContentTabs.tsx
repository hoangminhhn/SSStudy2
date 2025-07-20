"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Lock, ChevronUp, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card"; // Import Card for the outer container

interface CourseContentTabsProps {
  courseId: string;
}

interface Lesson {
  id: string;
  title: string;
  status: "free" | "pro";
  duration: string;
  locked: boolean;
  // proBadges?: string[]; // Removed as per request to show only one 'Pro' badge
}

interface Session {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

// Dummy data for course content
const dummyCourseContent: Session[] = [
  {
    id: "session-1",
    title: "Buổi 1: Reading 1: Thay đổi tư duy học Toán",
    completedLessons: 0,
    totalLessons: 4,
    lessons: [
      { id: "lesson-1-1", title: "Bài 1: Sự biến thiên của Hàm số và đồ thị hàm số chứng minh", status: "free", duration: "15:00", locked: false },
      { id: "lesson-1-2", title: "Bài 2: Phương trình bất quy tắc", status: "free", duration: "15:00", locked: false },
      { id: "lesson-1-3", title: "Bài 3: Các hằng đẳng thức đáng nhớ", status: "pro", duration: "15:00", locked: true /* proBadges: ["Pro", "Pro"] */ },
      { id: "lesson-1-4", title: "Bài 4: Phương trình và bất phương trình", status: "pro", duration: "15:00", locked: true /* proBadges: ["Pro", "Pro", "Pro"] */ },
    ],
  },
  {
    id: "session-2",
    title: "Buổi 2: Ma trận và các phép toán",
    completedLessons: 0,
    totalLessons: 4,
    lessons: [
      { id: "lesson-2-1", title: "Bài 1: Giới thiệu về Ma trận", status: "free", duration: "10:00", locked: false },
      { id: "lesson-2-2", title: "Bài 2: Phép cộng và trừ ma trận", status: "pro", duration: "20:00", locked: true /* proBadges: ["Pro"] */ },
    ],
  },
  {
    id: "session-3",
    title: "Buổi 3: Ma trận bậc thang dòng và các phép biến đổi sơ cấp",
    completedLessons: 0,
    totalLessons: 4,
    lessons: [
      { id: "lesson-3-1", title: "Bài 1: Định nghĩa ma trận bậc thang dòng", status: "free", duration: "12:00", locked: false },
      { id: "lesson-3-2", title: "Bài 2: Các phép biến đổi sơ cấp trên dòng", status: "pro", duration: "18:00", locked: true /* proBadges: ["Pro", "Pro"] */ },
    ],
  },
];

const CourseContentTabs: React.FC<CourseContentTabsProps> = ({ courseId }) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg mt-8"> {/* Added Card for styling */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="flex justify-start border-b border-gray-200 mb-6 bg-white p-0 h-auto"> {/* Adjusted TabsList styling */}
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
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {dummyCourseContent.map((session) => (
              <AccordionItem key={session.id} value={session.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger className="flex items-center justify-between py-4 text-base font-semibold text-gray-800 hover:no-underline">
                  <div className="flex items-center flex-grow"> {/* Added flex-grow */}
                    {/* Chevron icon will be handled by AccordionTrigger itself */}
                    <span className="ml-2">{session.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 flex-shrink-0"> {/* Added flex-shrink-0 */}
                    Hoàn thành {session.completedLessons}% {session.completedLessons}/{session.totalLessons} Bài giảng
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2 pt-0">
                  <div className="pl-6 pr-2 py-2 space-y-3">
                    {session.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <span className="text-blue-600 font-medium text-sm">{lesson.title}</span>
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
                          <span className="text-gray-500 text-sm w-[45px] text-right">
                            {lesson.duration}
                          </span>
                          {lesson.locked && <Lock size={16} className="text-gray-400" />}
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
          <div className="p-4 text-gray-600">Thông tin về giáo viên sẽ được hiển thị tại đây.</div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="p-4 text-gray-600">Các đánh giá khóa học sẽ được hiển thị tại đây.</div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CourseContentTabs;