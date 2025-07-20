export interface TimeSlot {
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
  teacher?: string; // Added teacher to session for lesson detail pages
  views?: number; // Added views to session for lesson detail pages
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
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 19,
        date: "10/07/2024",
      },
      {
        sessionId: "buoi-2-tong-on-luong-giac-phan-2",
        title: "Buổi 2: Tổng ôn lượng giác (phần 2)",
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 15,
        date: "12/07/2024",
      },
      { sessionId: "buoi-3-tong-on-csc-csn", title: "Buổi 3: Tổng ôn CSC – CSN", teacher: "Thầy Nguyễn Tiến Đạt", views: 10, date: "14/07/2024" },
      { sessionId: "buoi-4-tong-on-ham-so-mu-loga", title: "Buổi 4: Tổng ôn hàm số mũ loga", teacher: "Thầy Nguyễn Tiến Đạt", views: 12, date: "16/07/2024" },
      { sessionId: "buoi-5-tong-on-pt-bpt-mu-loga", title: "Buổi 5: Tổng ôn PT, BPT mũ loga", teacher: "Thầy Nguyễn Tiến Đạt", views: 8, date: "18/07/2024" },
      { sessionId: "buoi-6-tong-on-bai-toan-tang-truong-lai-suat", title: "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất", teacher: "Thầy Nguyễn Tiến Đạt", views: 7, date: "20/07/2024" },
      { sessionId: "buoi-7-tong-on-gioi-han", title: "Buổi 7: Tổng ôn giới hạn", teacher: "Thầy Nguyễn Tiến Đạt", views: 11, date: "22/07/2024" },
      { sessionId: "buoi-8-tong-on-phuong-trinh-tiep-tuyen-dao-ham", title: "Buổi 8: Tổng ôn phương trình tiếp tuyến & đạo hàm", teacher: "Thầy Nguyễn Tiến Đạt", views: 9, date: "24/07/2024" },
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
        teacher: "Cô Trần Thị B",
        views: 22,
        date: "26/07/2024",
      },
      { sessionId: "buoi-2-cac-dang-bai-tap", title: "Buổi 2: Các dạng bài tập", teacher: "Cô Trần Thị B", views: 18, date: "28/07/2024" },
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
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 10,
        date: "01/08/2024",
      },
      { sessionId: "buoi-2-do-thi-ham-so", title: "Buổi 2: Đồ thị hàm số", teacher: "Thầy Nguyễn Tiến Đạt", views: 14, date: "03/08/2024" },
    ],
  },
  {
    id: "chapter-4",
    progress: "0/1",
    title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-mau-so-lieu", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 5, date: "05/08/2024" },
    ],
  },
  {
    id: "chapter-5",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", teacher: "Thầy Nguyễn Tiến Đạt", views: 16, date: "07/08/2024" },
    ],
  },
  {
    id: "chapter-6",
    progress: "0/12",
    title: "[Classin] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-xac-suat", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 9, date: "09/08/2024" },
    ],
  },
  {
    id: "chapter-7",
    progress: "0/32",
    title: "[Classin] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-he-toa-do-oxyz", title: "Buổi 1: Hệ tọa độ Oxyz", teacher: "Thầy Nguyễn Tiến Đạt", views: 25, date: "11/08/2024" },
    ],
  },
  {
    id: "chapter-8",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-1", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 6, date: "13/08/2024" },
    ],
  },
  {
    id: "chapter-9",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-1", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 7, date: "15/08/2024" },
    ],
  },
  {
    id: "chapter-10",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-2", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 5, date: "17/08/2024" },
    ],
  },
  {
    id: "chapter-11",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-2", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 8, date: "19/08/2024" },
    ],
  },
  {
    id: "chapter-12",
    progress: "0/45",
    title: "[SSVOD] Chương 1: Hàm số",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-ham-so", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 30, date: "21/08/2024" },
    ],
  },
  {
    id: "chapter-13",
    progress: "0/2",
    title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-mau-so-lieu", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 4, date: "23/08/2024" },
    ],
  },
  {
    id: "chapter-14",
    progress: "0/24",
    title: "[SSVOD] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-nguyen-ham", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 20, date: "25/08/2024" },
    ],
  },
  {
    id: "chapter-15",
    progress: "0/12",
    title: "[SSVOD] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-xac-suat", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 10, date: "27/08/2024" },
    ],
  },
  {
    id: "chapter-16",
    progress: "0/26",
    title: "[SSVOD] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-oxyz", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 22, date: "29/08/2024" },
    ],
  },
];