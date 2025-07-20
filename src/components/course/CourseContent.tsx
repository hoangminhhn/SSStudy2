"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Play, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { isToday, parse } from 'date-fns';
import { Link } from "react-router-dom";
import { chapters } from "@/data/courseData";

interface TimeSlot {
  time: string;
  teacher: string;
  registrationStatus: 'register' | 'registered' | 'full';
}

interface Session {
  sessionId: string;
  title: string;
  date: string;
  type?: 'normal' | 'livestream';
  timeSlots?: TimeSlot[];
}

interface Chapter {
  id: string;
  progress: string;
  title: string;
  sessions: Session[];
}

interface CourseContentProps {
  isSidebar?: boolean;
}

const CourseContent: React.FC<CourseContentProps> = ({ isSidebar = false }) => {
  const [openChapters, setOpenChapters] = React.useState<string[]>([]);
  const today = new Date();

  const handleAccordionChange = (values: string[]) => {
    setOpenChapters(values);
  };

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

      <Accordion type="multiple" value={openChapters} onValueChange={handleAccordionChange} className="w-full space-y-4">
        {chapters.map((chapter) => {
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
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm">
                              Đăng Ký học
                            </Button>
                          );
                        } else if (hasRegisteredSlot) {
                          buttonContent = (
                            <Button className="bg-gray-400 text-gray-700 rounded-full px-4 py-2 text-sm cursor-not-allowed" disabled>
                              Đã đăng ký
                            </Button>
                          );
                        } else {
                          buttonContent = (
                            <Button className="bg-red-600 text-white rounded-full px-4 py-2 text-sm cursor-not-allowed" disabled>
                              Hết chỗ
                            </Button>
                          );
                        }
                      }

                      return (
                        <div key={session.sessionId} className="flex flex-col py-2">
                          {/* Hàng trên: Icon + Tiêu đề + Ngày */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3 flex-grow">
                              <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2"></span>
                              {session.type === 'livestream' ? (
                                <Play size={18} className="text-orange-500 flex-shrink-0 mt-2" />
                              ) : (
                                <FileText size={18} className="text-orange-500 flex-shrink-0 mt-2" />
                              )}
                              <Link
                                to={`/lesson/${session.sessionId}`}
                                className="text-gray-800 hover:underline flex-grow"
                                id={sessionIndex === 0 && chapter.id === "chapter-1" ? "tour-first-lesson-item" : undefined}
                              >
                                {session.title}
                              </Link>
                            </div>
                            <span className="text-gray-500 text-sm flex-shrink-0 ml-4 mt-2">
                              Ngày: {session.date}
                            </span>
                          </div>

                          {/* Hàng dưới: Livestream Badge + Buttons */}
                          <div className="flex items-center justify-between pl-8">
                            <div className="flex items-center space-x-2">
                              {session.type === 'livestream' && (
                                <Badge variant="destructive" className="bg-red-500 text-white px-4 py-2">
                                  Livestream {displayTime && `(${displayTime})`}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4">
                              {buttonContent}
                            </div>
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