export interface Material {
  id: string;
  title: string;
  description: string;
  accessLevel: "all" | "purchased"; // "purchased" = VIP for students who bought the course
  courseId?: string | null; // if accessLevel === 'purchased', this ties to a course
  category: string;
  grade?: string;
  subject?: string;
  format?: "pdf" | "ppt" | "docx" | "zip" | "video";
  thumbnail?: string;
  previewUrl?: string;
  fileUrl?: string;
  uploadedAt?: string;
}

export const materials: Material[] = [
  {
    id: "m-free-1",
    title: "Tổng hợp công thức Toán 12 (Miễn phí)",
    description: "Tài liệu tóm tắt công thức Toán lớp 12, phù hợp ôn tập nhanh.",
    accessLevel: "all",
    category: "Tóm tắt",
    grade: "12",
    subject: "Toán",
    format: "pdf",
    thumbnail: "/images/placeholder.svg",
    previewUrl: "/images/placeholder.svg",
    fileUrl: "/images/placeholder.svg",
    uploadedAt: "2025-07-01",
  },
  {
    id: "m-vip-1",
    title: "Bộ đề luyện tập chuyên sâu - Khóa Math-12-S1 (VIP)",
    description: "Bộ đề chuyên sâu kèm hướng dẫn giải cho học viên khóa Master HSA - Toán 12.",
    accessLevel: "purchased",
    courseId: "math-12-s1",
    category: "Đề luyện",
    grade: "12",
    subject: "Toán",
    format: "pdf",
    thumbnail: "/images/placeholder.svg",
    previewUrl: "/images/placeholder.svg",
    fileUrl: "/images/placeholder.svg",
    uploadedAt: "2025-06-15",
  },
  {
    id: "m-free-2",
    title: "Bài tập chọn lọc Hóa học (Miễn phí)",
    description: "Tuyển tập bài tập Hóa có đáp án giúp ôn luyện cho kỳ thi.",
    accessLevel: "all",
    category: "Bài tập",
    grade: "12",
    subject: "Hóa",
    format: "pdf",
    thumbnail: "/images/placeholder.svg",
    previewUrl: "/images/placeholder.svg",
    fileUrl: "/images/placeholder.svg",
    uploadedAt: "2025-05-20",
  },
  {
    id: "m-vip-2",
    title: "Tài liệu nâng cao: Phân tích đề thi - Khóa Physics-12-S1 (VIP)",
    description: "Tổng hợp các đề khó, phân tích chiến lược làm bài dành cho học viên khóa Vật lý.",
    accessLevel: "purchased",
    courseId: "physics-12-s1",
    category: "Phân tích đề",
    grade: "12",
    subject: "Vật Lý",
    format: "pdf",
    thumbnail: "/images/placeholder.svg",
    previewUrl: "/images/placeholder.svg",
    fileUrl: "/images/placeholder.svg",
    uploadedAt: "2025-06-10",
  },
];