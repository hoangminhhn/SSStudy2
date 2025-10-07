export type Doc = {
  id: string;
  title: string;
  subject: string;
  course?: string | null;
  summary?: string;
  free: boolean;
  url?: string;
  category?: string;
  grade?: string;
};

export const FREE_DOCS: Doc[] = [
  {
    id: "f-1",
    title: "Tổng hợp công thức lượng giác",
    subject: "Toán",
    summary: "Tóm tắt các công thức lượng giác thường gặp, dạng bài và mẹo giải.",
    free: true,
    url: "/docs/tong-hop-luong-giac.pdf",
    category: "Tổng hợp",
    grade: "Lớp 12",
  },
  {
    id: "f-2",
    title: "Bảng công thức đạo hàm & nguyên hàm",
    subject: "Toán",
    summary: "Các công thức nguyên hàm, đạo hàm cơ bản dùng cho luyện thi.",
    free: true,
    url: "/docs/bang-cong-thuc-deriv.pdf",
    category: "Tổng hợp",
    grade: "Lớp 11",
  },
  {
    id: "f-3",
    title: "Phrasal verbs cơ bản",
    subject: "Anh",
    summary: "Tập hợp các phrasal verbs phổ biến trong phần đọc và viết.",
    free: true,
    url: "/docs/phrasal-verbs.pdf",
    category: "Tham khảo",
    grade: "Lớp 12",
  },
];

export const ALL_DOCS: Doc[] = [
  ...FREE_DOCS,
  {
    id: "c-math-1",
    title: "Bộ đề chuyên đề Toán - Buổi 1",
    subject: "Toán",
    course: "Master HSA - Toán 12",
    summary: "Bộ đề buổi 1 kèm lời giải chi tiết.",
    free: false,
    url: "/docs/master-hsa-buoi-1.pdf",
    category: "Luyện đề",
    grade: "Lớp 12",
  },
  {
    id: "c-math-2",
    title: "Tổng hợp bài tập PT, BPT",
    subject: "Toán",
    course: "Master HSA - Toán 12",
    summary: "Bài tập luyện tập và hướng dẫn nhanh.",
    free: false,
    url: "/docs/pt-bpt.pdf",
    category: "Tổng hợp",
    grade: "Lớp 12",
  },
  {
    id: "c-physics-1",
    title: "Bài tập Vật lý - Điện xoay chiều",
    subject: "Lý",
    course: "Vật lý chuyên sâu",
    summary: "Bài tập theo chủ đề và đáp án chi tiết.",
    free: false,
    url: "/docs/dien-xoay-chieu.pdf",
    category: "Luyện đề",
    grade: "Lớp 12",
  },
];

export const DEMO_USER_COURSES = [
  { id: "course-1", title: "Master HSA - Toán 12" },
  { id: "course-2", title: "Vật lý chuyên sâu" },
];