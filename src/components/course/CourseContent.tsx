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
import LivestreamTimeSlotsDialog from "./LivestreamTimeSlotsDialog";
import { isToday, parse, isAfter, compareAsc } from 'date-fns';
import { Link } from "react-router-dom";

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

// Helper to get tomorrow's date in 'dd/MM/yyyy' format
const getTomorrowDateString = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = tomorrow.getFullYear();
  return `${day}/${month}/${year}`;
};

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    progress: "0/8",
    title: "Tổng ôn kiến thức lớp 11 phần Đại số",
    sessions: [
      {
        sessionId: "buoi-1-tong-on-luong-giac-phan-1",
        title: "Buổi 1: Tổng ôn lượng giác (phần 1)",
        date: getTomorrowDateString(), // Set to tomorrow's date
        type: 'livestream',
        timeSlots: [
          { time: "09:00 - 10:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
          { time: "14:00 - 15:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'full' },
          { time: "19:00 - 20:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'registered' },
          { time: "20:00 - 21:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
        ]
      },
      {
        sessionId: "buoi-2-tong-on-luong-giac-phan-2",
        title: "Buổi 2: Tổng ôn lượng giác (phần 2)",
        date: "15/06/2025", // Changed back to a fixed date
        type: 'livestream',
        timeSlots: [
          { time: "10:00 - 11:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
        ]
      },
      { sessionId: "buoi-3-tong-on-csc-csn", title: "Buổi 3: Tổng ôn CSC – CSN", date: "15/06/2025" },
      { sessionId: "buoi-4-tong-on-ham-so-mu-loga", title: "Buổi 4: Tổng ôn hàm số mũ loga", date: "15/06/2025" },
      { sessionId: "buoi-5-tong-on-pt-bpt-mu-loga", title: "Buổi 5: Tổng ôn PT, BPT mũ loga", date: "15/06/2025" },
      { sessionId: "buoi-6-tong-on-bai-toan-tang-truong-lai-suat", title: "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất", date: "15/06/2025" },
      { sessionId: "buoi-7-tong-on-gioi-han", title: "Buổi 7: Tổng ôn giới hạn", date: "15/06/2025" },
      { sessionId: "buoi-8-tong-on-phuong-trinh-tiep-tuyen-dao-ham", title: "Buổi 8: Tổng ôn phương trình tiếp tuyến & đạo hàm", date: "15/06/2025" },
    ],
  },
  {
    id: "chapter-2",
    progress: "0/9",
    title: "Tổng ôn kiến thức lớp 11 phần Hình học",
    sessions: [
      {
        sessionId: "buoi-1-gioi-thieu-hinh-hoc",
        title: "Buổi 1: Giới thiệu hình học",
        date: "16/06/2025",
        type: 'livestream',
        timeSlots: [
          { time: "10:00 - 11:00", teacher: "Cô Trần Thị B", registrationStatus: 'registered' },
          { time: "16:00 - 17:00", teacher: "Cô Trần Thị B", registrationStatus: 'register' },
        ]
      },
      { sessionId: "buoi-2-cac-dang-bai-tap", title: "Buổi 2: Các dạng bài tập", date: "17/06/2025" },
    ],
  },
  {
    id: "chapter-3",
    progress: "0/43",
    title: "[Classin] Chương 1: Hàm số",
    sessions: [
      {
        sessionId: "buoi-1-khai-niem-ham-so",
        title: "Buổi 1: Khái niệm hàm số",
        date: "18/06/2025",
        type: 'livestream',
        timeSlots: [
          { time: "08:00 - 09:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'full' },
        ]
      },
      { sessionId: "buoi-2-do-thi-ham-so", title: "Buổi 2: Đồ thị hàm số", date: "19/06/2025" },
    ],
  },
  {
    id: "chapter-4",
    progress: "0/1",
    title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-mau-so-lieu", title: "Buổi 1: Giới thiệu", date: "20/06/2025" },
    ],
  },
  {
    id: "chapter-5",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", date: "21/06/2025" },
    ],
  },
  {
    id: "chapter-6",
    progress: "0/12",
    title: "[Classin] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-xac-suat", title: "Buổi 1: Giới thiệu", date: "22/06/2025" },
    ],
  },
  {
    id: "chapter-7",
    progress: "0/32",
    title: "[Classin] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-he-toa-do-oxyz", title: "Buổi 1: Hệ tọa độ Oxyz", date: "23/06/2025" },
    ],
  },
  {
    id: "chapter-8",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-1", title: "Buổi 1: Tổng ôn", date: "24/06/2025" },
    ],
  },
  {
    id: "chapter-9",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-1", title: "Buổi 1: Tổng ôn", date: "25/06/2025" },
    ],
  },
  {
    id: "chapter-10",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-2", title: "Buổi 1: Tổng ôn", date: "26/06/2025" },
    ],
  },
  {
    id: "chapter-11",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-2", title: "Buổi 1: Tổng ôn", date: "27/06/2025" },
    ],
  },
  {
    id: "chapter-12",
    progress: "0/45",
    title: "[SSVOD] Chương 1: Hàm số",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-ham-so", title: "Buổi 1: Giới thiệu", date: "28/06/2025" },
    ],
  },
  {
    id: "chapter-13",
    progress: "0/2",
    title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-mau-so-lieu", title: "Buổi 1: Giới thiệu", date: "29/06/2025" },
    ],
  },
  {
    id: "chapter-14",
    progress: "0/24",
    title: "[SSVOD] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", date: "30/06/2025" },
    ],
  },
  {
    id: "chapter-15",
    progress: "0/12",
    title: "[SSVOD] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-xac-suat", title: "Buổi 1: Giới thiệu", date: "01/07/2025" },
    ],
  },
  {
    id: "chapter-16",
    progress: "0/26",
    title: "[SSVOD] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-oxyz", title: "Buổi 1: Giới thiệu", date: "02/07/2025" },
    ],
  },
  // Duplicate some chapters to ensure content overflows
  {
    id: "chapter-17",
    progress: "0/8",
    title: "Tổng ôn kiến thức lớp 11 phần Đại số (Tiếp)",
    sessions: [
      {
        sessionId: "buoi-9-tong-on-luong-giac-phan-3",
        title: "Buổi 9: Tổng ôn lượng giác (phần 3)",
        date: "03/07/2025",
        type: 'livestream',
        timeSlots: [
          { time: "09:00 - 10:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
        ]
      },
      { sessionId: "buoi-10-tong-on-luong-giac-phan-4", title: "Buổi 10: Tổng ôn lượng giác (phần 4)", date: "04/07/2025" },
      { sessionId: "buoi-11-tong-on-csc-csn-2", title: "Buổi 11: Tổng ôn CSC – CSN (phần 2)", date: "05/07/2025" },
      { sessionId: "buoi-12-tong-on-ham-so-mu-loga-2", title: "Buổi 12: Tổng ôn hàm số mũ loga (phần 2)", date: "06/07/2025" },
    ],
  },
  {
    id: "chapter-18",
    progress: "0/9",
    title: "Tổng ôn kiến thức lớp 11 phần Hình học (Tiếp)",
    sessions: [
      {
        sessionId: "buoi-3-gioi-thieu-hinh-hoc-2",
        title: "Buổi 3: Giới thiệu hình học (phần 2)",
        date: "07/07/2025",
        type: 'livestream',
        timeSlots: [
          { time: "10:00 - 11:00", teacher: "Cô Trần Thị B", registrationStatus: 'register' },
        ]
      },
      { sessionId: "buoi-4-cac-dang-bai-tap-2", title: "Buổi 4: Các dạng bài tập (phần 2)", date: "08/07/2025" },
    ],
  },
  {
    id: "chapter-19",
    progress: "0/43",
    title: "[Classin] Chương 1: Hàm số (Tiếp)",
    sessions: [
      {
        sessionId: "buoi-3-khai-niem-ham-so-2",
        title: "Buổi 3: Khái niệm hàm số (phần 2)",
        date: "09/07/2025",
        type: 'livestream',
        timeSlots: [
          { time: "08:00 - 09:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
        ]
      },
      { sessionId: "buoi-4-do-thi-ham-so-2", title: "Buổi 4: Đồ thị hàm số (phần 2)", date: "10/07/2025" },
    ],
  },
  {
    id: "chapter-20",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân (Tiếp)",
    sessions: [
      { sessionId: "buoi-2-nguyen-ham-co-ban-2", title: "Buổi 2: Nguyên hàm cơ bản (phần 2)", date: "11/07/2025" },
      { sessionId: "buoi-3-nguyen-ham-nang-cao", title: "Buổi 3: Nguyên hàm nâng cao", date: "12/07/2025" },
      { sessionId: "buoi-4-tich-phan-co-ban", title: "Buổi 4: Tích phân cơ bản", date: "13/07/2025" },
      { sessionId: "buoi-5-tich-phan-nang-cao", title: "Buổi 5: Tích phân nâng cao", date: "14/07/2025" },
    ],
  },
];

interface CourseContentProps {
  isSidebar?: boolean; // New prop to adjust styling if used as a sidebar
}

const CourseContent: React.FC<CourseContentProps> = ({ isSidebar = false }) => {
  const [openChapters, setOpenChapters] = React.useState<string[]>([]);
  const [nextLiveSessionInfo, setNextLiveSessionInfo] = React.useState<{ chapterId: string; sessionId: string } | null>(null);
  const sessionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    let closestLiveSession: { chapterId: string; sessionId: string; dateTime: Date } | null = null;
    const now = new Date();

    chapters.forEach(chapter => {
      chapter.sessions.forEach(session => {
        if (session.type === 'livestream' && session.timeSlots && session.timeSlots.length > 0) {
          const sessionDate = parse(session.date, 'dd/MM/yyyy', new Date());

          session.timeSlots.forEach(slot => {
            try {
              // Combine date and time for full comparison
              const [hours, minutes] = slot.time.split(' ')[0].split(':').map(Number);
              const liveDateTime = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate(), hours, minutes);

              // Only consider future or current live sessions
              if (isAfter(liveDateTime, now)) {
                if (!closestLiveSession || compareAsc(liveDateTime, closestLiveSession.dateTime) < 0) {
                  closestLiveSession = {
                    chapterId: chapter.id,
                    sessionId: session.sessionId,
                    dateTime: liveDateTime,
                  };
                }
              }
            } catch (e) {
              console.error("Error parsing time slot:", slot.time, e);
            }
          });
        }
      });
    });

    if (closestLiveSession) {
      setNextLiveSessionInfo({
        chapterId: closestLiveSession.chapterId,
        sessionId: closestLiveSession.sessionId,
      });
      // Automatically open the chapter containing the next live session
      setOpenChapters(prev => {
        if (!prev.includes(closestLiveSession!.chapterId)) {
          return [...prev, closestLiveSession!.chapterId];
        }
        return prev;
      });
    }
  }, []); // Run once on mount

  const handleAccordionChange = (values: string[]) => {
    setOpenChapters(values);
  };

  const scrollToNextLiveSession = () => {
    if (nextLiveSessionInfo && sessionRefs.current[nextLiveSessionInfo.sessionId]) {
      sessionRefs.current[nextLiveSessionInfo.sessionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <div className={isSidebar ? "" : "mt-8"}>
      {!isSidebar ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-orange-600">BÀI HỌC</h2>
            {nextLiveSessionInfo && (
              <Button
                onClick={scrollToNextLiveSession}
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm"
              >
                <Play size={16} className="mr-1" />
                Live sắp tới
              </Button>
            )}
          </div>
          <p className="text-gray-700 mb-6">
            Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
          </p>
        </>
      ) : (
        // For sidebar, the h2 is rendered by the parent component (LessonDetailPageV2)
        // So we just render the button if it exists, at the top of this component's content
        nextLiveSessionInfo && (
          <div className="mb-4 pt-0">
            <Button
              onClick={scrollToNextLiveSession}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 text-sm"
            >
              <Play size={16} className="mr-1" />
              Live sắp tới
            </Button>
          </div>
        )
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
                      const isNextLiveSession = nextLiveSessionInfo && nextLiveSessionInfo.sessionId === session.sessionId;

                      return (
                        <div
                          key={session.sessionId}
                          ref={el => { sessionRefs.current[session.sessionId] = el; }}
                          className={`flex items-center justify-between py-2 ${isNextLiveSession ? 'bg-blue-50 border-l-4 border-blue-500 pl-2 -ml-2 rounded-r-md' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></span>
                            {session.type === 'livestream' ? (
                              <Play size={18} className="text-orange-500" />
                            ) : (
                              <FileText size={18} className="text-orange-500" />
                            )}
                            <Link
                                to={`/lesson/${session.sessionId}`}
                                className="text-gray-800 hover:underline"
                                id={sessionIndex === 0 && chapter.id === "chapter-1" ? "tour-first-lesson-item" : undefined}
                            >
                                {session.title}
                            </Link>
                            {session.type === 'livestream' && session.timeSlots && session.timeSlots.length > 0 && (
                              <Badge variant="destructive" className="ml-2 bg-red-500 text-white">
                                Live ({session.timeSlots[0].time})
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            {isLiveToday ? (
                              <Link to={`/lesson/${session.sessionId}`}>
                                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-4 py-2 text-sm">
                                  Vào học
                                </Button>
                              </Link>
                            ) : session.type === 'livestream' && session.timeSlots && session.timeSlots.length > 0 ? (
                              <LivestreamTimeSlotsDialog
                                sessionTitle={session.title}
                                sessionDate={session.date}
                                timeSlots={session.timeSlots}
                              >
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 text-sm">
                                  Đăng Ký học
                                </Button>
                              </LivestreamTimeSlotsDialog>
                            ) : null}
                            <span className="text-gray-500 text-sm">
                              Ngày: {session.date}
                            </span>
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