"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import QuestionPanel, { Question } from "@/components/exam/attempt/QuestionPanel";
import SidebarPanel from "@/components/exam/attempt/SidebarPanel";
import { showSuccess } from "@/utils/toast";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-1",
    text: "Cho hàm số f(x) = x^2 + 1. Giá trị của f(2) là bao nhiêu?",
    choices: [
      { id: "a", text: "2" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "6" },
    ],
  },
  {
    id: "q-2",
    text: "Tổng của 2 và 3 bằng?",
    choices: [
      { id: "a", text: "4" },
      { id: "b", text: "5" },
      { id: "c", text: "6" },
      { id: "d", text: "7" },
    ],
  },
  {
    id: "q-3",
    text: "Số nguyên tố nhỏ nhất là:",
    choices: [
      { id: "a", text: "0" },
      { id: "b", text: "1" },
      { id: "c", text: "2" },
      { id: "d", text: "3" },
    ],
  },
  {
    id: "q-4",
    text: "Kết quả của 7 * 8 là:",
    choices: [
      { id: "a", text: "54" },
      { id: "b", text: "56" },
      { id: "c", text: "58" },
      { id: "d", text: "64" },
    ],
  },
  {
    id: "q-5",
    text: "Câu ví dụ: chọn đáp án đúng nhất.",
    choices: [
      { id: "a", text: "Lựa chọn A" },
      { id: "b", text: "Lựa chọn B" },
      { id: "c", text: "Lựa chọn C" },
      { id: "d", text: "Lựa chọn D" },
    ],
  },
];

const ExamAttemptPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const questions = useMemo(() => SAMPLE_QUESTIONS, []);

  const [answers, setAnswers] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, null])),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer (seconds) - demo set to 90 minutes but clamped for demo to 5 minutes max
  const initialSeconds = 90 * 60;
  const [remainingSeconds, setRemainingSeconds] = useState<number>(Math.min(5 * 60, initialSeconds));

  useEffect(() => {
    const id = setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          handleSubmit();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleSelect = (choiceId: string, qIndex: number) => {
    const qId = questions[qIndex].id;
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));
  };

  const handleJump = (index: number) => {
    setCurrentIndex(index);
    const el = questionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = () => {
    showSuccess("Bài thi đã được nộp. Chuyển sang màn kết quả...");
    setTimeout(() => {
      navigate(`/thi-thu/${examId}/result`);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle={`Thi - ${examId ?? "V-ACT"}`} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: all questions */}
          <div className="lg:col-span-8 space-y-6">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                ref={(el) => (questionRefs.current[idx] = el)}
                className={`rounded-md ${currentIndex === idx ? "ring-2 ring-blue-200" : ""}`}
              >
                <QuestionPanel
                  question={q}
                  index={idx}
                  total={questions.length}
                  selectedChoiceId={answers[q.id] ?? null}
                  onSelect={(choiceId: string) => handleSelect(choiceId, idx)}
                />
              </div>
            ))}
          </div>

          {/* Right: sidebar */}
          <div className="lg:col-span-4">
            <SidebarPanel
              total={questions.length}
              currentIndex={currentIndex}
              answers={answers}
              onJump={handleJump}
              remainingSeconds={remainingSeconds}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExamAttemptPage;