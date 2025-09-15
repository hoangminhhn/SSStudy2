"use client";

import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, HelpCircle } from "lucide-react";

const ExamStartPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  // For demo purposes we map a known id to display info; otherwise fall back to generic info
  const examTitle = examId === "e-1" ? "Thi thử tốt nghiệp năm 2024" : "Đề thi luyện tập";
  const examSubtitle = "Đánh giá năng lực";
  const questionCount = 20;
  const duration = "90 phút";
  const status = "Chưa làm";
  const score = "Chưa có";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <BreadcrumbNav courseTitle={examTitle} />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Illustration */}
          <div className="mx-auto w-36 h-36 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-sm">
            {/* simple decorative SVG */}
            <svg width="84" height="84" viewBox="0 0 24 24" fill="none" className="text-blue-600">
              <rect x="3" y="3" width="18" height="18" rx="4" fill="#EFF6FF" />
              <path d="M8 9h8M8 13h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 6l1-2h4l1 2" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold text-slate-800 mb-2">Hãy sẵn sàng</h2>
          <p className="text-sm text-gray-500 mb-8">Bài thi sẽ bắt đầu tính giờ ngay sau khi bạn bắt đầu.</p>

          <Card className="p-6 shadow-sm rounded-lg">
            <div className="text-center mb-4">
              <div className="text-sm text-blue-600 font-semibold">{examSubtitle}</div>
              <div className="text-lg font-semibold text-gray-800 mt-2">{examTitle}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Số câu</div>
                  <div className="text-sm font-medium text-gray-800">{questionCount}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Thời gian</div>
                  <div className="text-sm font-medium text-gray-800">{duration}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <HelpCircle size={16} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Tình trạng</div>
                  <div className="text-sm font-medium text-red-600">{status}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <span className="text-sm font-semibold">#</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Điểm</div>
                  <div className="text-sm font-medium text-gray-800">{score}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 justify-center">
              <Link to="/thi-thu" className="w-44">
                <Button variant="outline" className="w-full rounded-full">
                  &lt; Quay lại trang thi
                </Button>
              </Link>

              <Button
                className="w-44 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                onClick={() => navigate(`/thi-thu/${examId}/attempt`)}
              >
                Bắt đầu thi
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExamStartPage;