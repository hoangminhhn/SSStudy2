"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import QuestionPanel, { Question } from "@/components/exam/attempt/QuestionPanel";
import SidebarPanel from "@/components/exam/attempt/SidebarPanel";
import { showSuccess } from "@/utils/toast";
import QuestionItem from "@/components/exam/attempt/QuestionItem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const location = useLocation();

  // Decide default full-exam view:
  // - if query contains full=1
  // - or if examId includes "v-act" (case-insensitive)
  const queryParams = new URLSearchParams(location.search);
  const isFullQuery = queryParams.get("full") === "1";
  const isVActExam = !!examId && examId.toLowerCase().includes("v-act");
  const defaultFullView = isFullQuery || isVActExam;

  // For demo we use SAMPLE_QUESTIONS; in real app fetch by examId
  const questions = useMemo(() => SAMPLE_QUESTIONS, []);

  // answers keyed by question id (e.g., q-1 -> 'a')
  const [answers, setAnswers] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(questions.map((q) => [q.id, null])),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // fullMode controls whether we render the stacked full view (all questions)
  const [fullMode, setFullMode] = useState<boolean>(defaultFullView);

  // keep fullMode in sync when route/query/examId changes
  useEffect(() => {
    setFullMode(defaultFullView);
    // reset scroll position to top when toggling mode on route change
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, defaultFullView]);

  // Timer (seconds) - demo set to 20 minutes (1200s). Adjust as needed.
  const initialSeconds = 90 * 60; // 90 minutes
  const [remainingSeconds, setRemainingSeconds] = useState<number>(Math.min(5 * 60, initialSeconds)); // demo clamp to 5m

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

  const handleSelect = (choiceId: string, qId?: string) => {
    // In single-question view, qId is undefined and currentIndex identifies the question.
    const targetId = qId ?? questions[currentIndex].id;
    setAnswers((prev) => ({ ...prev, [targetId]: choiceId }));
  };

  const handleNext = () => {
    setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  const handleJump = (index: number) => {
    setCurrentIndex(index);
    if (fullMode) {
      // scroll the question into view when full view is active
      const el = document.getElementById(questions[index].id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSubmit = () => {
    // simple demo action: show toast and navigate to a result URL
    showSuccess("Bài thi đã được nộp. Chuyển sang màn kết quả...");
    // navigate to result page (you can implement result page later)
    setTimeout(() => {
      navigate(`/thi-thu/${examId}/result`);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle={`Thi - ${examId ?? "V-ACT"}`} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Bài thi: {examId ?? "V-ACT (demo)"}</h2>
          </div>

          {/* Toggle full mode control */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Chế độ:</span>
            <Button
              variant={fullMode ? "outline" : "ghost"}
              className={`rounded-full px-3 py-1 text-sm ${fullMode ? "bg-gray-100" : ""}`}
              onClick={() => setFullMode(true)}
            >
              Hiển thị tất cả câu hỏi
            </Button>
            <Button
              variant={!fullMode ? "outline" : "ghost"}
              className={`rounded-full px-3 py-1 text-sm ${!fullMode ? "bg-gray-100" : ""}`}
              onClick={() => setFullMode(false)}
            >
              Chế độ từng câu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: questions area */}
          <div className={fullMode ? "lg:col-span-9" : "lg:col-span-8"}>
            {fullMode ? (
              // FULL EXAM VIEW: render all questions stacked and NO Prev/Next buttons
              <div className="space-y-6">
                {questions.map((q, qi) => (
                  <Card key={q.id} id={q.id} className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Câu {qi + 1}:</div>
                      <div className="text-xs text-gray-500">Mã: {q.id}</div>
                    </div>

                    <div className="prose max-w-none text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: q.text }} />

                    <div className="grid gap-3">
                      {q.choices.map((c, i) => (
                        <QuestionItem
                          key={c.id}
                          choice={c}
                          index={i}
                          checked={answers[q.id] === c.id}
                          onChange={(choiceId) => handleSelect(choiceId, q.id)}
                        />
                      ))}
                    </div>
                  </Card>
                ))}

                <div className="flex justify-end">
                  <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-3" onClick={handleSubmit}>
                    Nộp bài & Xem kết quả
                  </Button>
                </div>
              </div>
            ) : (
              // PAGINATED / SINGLE QUESTION VIEW (existing behavior with Prev/Next)
              <QuestionPanel
                question={questions[currentIndex]}
                index={currentIndex}
                total={questions.length}
                selectedChoiceId={answers[questions[currentIndex].id] ?? null}
                onSelect={(choiceId) => handleSelect(choiceId)}
                onNext={handleNext}
                onPrev={handlePrev}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Right: sidebar */}
          <div className={fullMode ? "lg:col-span-3" : "lg:col-span-4"}>
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