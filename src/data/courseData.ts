import { parse, isFuture, isToday } from 'date-fns';

interface TimeSlot {
  time: string;
  teacher: string;
  registrationStatus: 'register' | 'registered' | 'full';
}

export interface Session {
  sessionId: string;
  title: string;
  date: string;
  type?: 'normal' | 'livestream';
  timeSlots?: TimeSlot[];
  teacher?: string; // Added for LessonHero data consistency
  views?: number; // Added for LessonHero data consistency
}

export interface Chapter {
  id: string;
  progress: string;
  title: string;
  sessions: Session[];
}

export const chapters: Chapter[] = [
  {
    id: "chapter-1",
    progress: "0/8",
    title: "Tổng ôn kiến thức lớp 11 phần Đại số",
    sessions: [
      {
        sessionId: "buoi-1-tong-on-luong-giac-phan-1",
        title: "Buổi 1: Tổng ôn lượng giác (phần 1)",
        date: "15/06/2025",
        type: 'livestream',
        timeSlots: [
          { time: "09:00 - 10:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
          { time: "14:00 - 15:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'full' },
          { time: "19:00 - 20:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'registered' },
        ],
        teacher: "Thầy Nguyễn Tiến Đạt", views: 19,
      },
      {
        sessionId: "buoi-2-tong-on-luong-giac-phan-2",
        title: "Buổi 2: Tổng ôn lượng giác (phần 2)",
        date: new Date().toLocaleDateString('en-GB'), // Set to today for testing "Vào học"
        type: 'livestream',
        timeSlots: [
          { time: "10:00 - 11:00", teacher: "Thầy Nguyễn Tiến Đạt", registrationStatus: 'register' },
        ],
        teacher: "Thầy Nguyễn Tiến Đạt", views: 15,
      },
      { sessionId: "buoi-3-tong-on-csc-csn", title: "Buổi 3: Tổng ôn CSC – CSN", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 10 },
      { sessionId: "buoi-4-tong-on-ham-so-mu-loga", title: "Buổi 4: Tổng ôn hàm số mũ loga", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 12 },
      { sessionId: "buoi-5-tong-on-pt-bpt-mu-loga", title: "Buổi 5: Tổng ôn PT, BPT mũ loga", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 8 },
      { sessionId: "buoi-6-tong-on-bai-toan-tang-truong-lai-suat", title: "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 7 },
      { sessionId: "buoi-7-tong-on-gioi-han", title: "Buổi 7: Tổng ôn giới hạn", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 11 },
      { sessionId: "buoi-8-tong-on-phuong-trinh-tiep-tuyen-dao-ham", title: "Buổi 8: Tổng ôn phương trình tiếp tuyến & đạo hàm", date: "15/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 9 },
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
        ],
        teacher: "Cô Trần Thị B", views: 22,
      },
      { sessionId: "buoi-2-cac-dang-bai-tap", title: "Buổi 2: Các dạng bài tập", date: "17/06/2025", teacher: "Cô Trần Thị B", views: 18 },
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
        ],
        teacher: "Thầy Nguyễn Tiến Đạt", views: 10,
      },
      { sessionId: "buoi-2-do-thi-ham-so", title: "Buổi 2: Đồ thị hàm số", date: "19/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 14 },
    ],
  },
  {
    id: "chapter-4",
    progress: "0/1",
    title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-mau-so-lieu", title: "Buổi 1: Giới thiệu", date: "20/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 5 },
    ],
  },
  {
    id: "chapter-5",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", date: "21/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 16 },
    ],
  },
  {
    id: "chapter-6",
    progress: "0/12",
    title: "[Classin] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-xac-suat", title: "Buổi 1: Giới thiệu", date: "22/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 9 },
    ],
  },
  {
    id: "chapter-7",
    progress: "0/32",
    title: "[Classin] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-he-toa-do-oxyz", title: "Buổi 1: Hệ tọa độ Oxyz", date: "23/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 25 },
    ],
  },
  {
    id: "chapter-8",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-1", title: "Buổi 1: Tổng ôn", date: "24/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 6 },
    ],
  },
  {
    id: "chapter-9",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-1", title: "Buổi 1: Tổng ôn", date: "25/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 7 },
    ],
  },
  {
    id: "chapter-10",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-2", title: "Buổi 1: Tổng ôn", date: "26/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 5 },
    ],
  },
  {
    id: "chapter-11",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-2", title: "Buổi 1: Tổng ôn", date: "27/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 8 },
    ],
  },
  {
    id: "chapter-12",
    progress: "0/45",
    title: "[SSVOD] Chương 1: Hàm số",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-ham-so", title: "Buổi 1: Giới thiệu", date: "28/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 30 },
    ],
  },
  {
    id: "chapter-13",
    progress: "0/2",
    title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-mau-so-lieu", title: "Buổi 1: Giới thiệu", date: "29/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 4 },
    ],
  },
  {
    id: "chapter-14",
    progress: "0/24",
    title: "[SSVOD] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", date: "30/06/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 20 },
    ],
  },
  {
    id: "chapter-15",
    progress: "0/12",
    title: "[SSVOD] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-xac-suat", title: "Buổi 1: Giới thiệu", date: "01/07/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 10 },
    ],
  },
  {
    id: "chapter-16",
    progress: "0/26",
    title: "[SSVOD] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-oxyz", title: "Buổi 1: Giới thiệu", date: "02/07/2025", teacher: "Thầy Nguyễn Tiến Đạt", views: 22 },
    ],
  },
];

export const allLessons = chapters.flatMap(chapter =>
  chapter.sessions.map(session => ({
    ...session,
    courseTitle: chapter.title,
  }))
);