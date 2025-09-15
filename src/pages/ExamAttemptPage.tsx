"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import QuestionPanel, { Question } from "@/components/exam/attempt/QuestionPanel";
import SidebarPanel from "@/components/exam/attempt/SidebarPanel";
import PassageQuestionGroup from "@/components/exam/attempt/PassageQuestionGroup";
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

// Define a passage group with four questions (expanded from 2 to 4)
const PASSAGE_HTML = `
  <p><strong>Đọc đoạn trích dưới đây và trả lời các câu hỏi tiếp theo.</strong></p>
  <p>“Định nghĩa về mỹ học như 'khoa học của cái đẹp' xuất phát từ Baumgarten. Ông sử dụng thuật ngữ 'khoa học đẹp' (belles sciences) để chỉ những nghiên cứu về 'tư duy đẹp' (belles pensées) đã gợi cảm hứng cho con người chiêm ngắm mỹ thuật. 'Mỹ học' và 'cái đẹp' có mối liên hệ bền bỉ cho đến ngày nay, đến độ các thuật ngữ này đôi khi được cho là đồng nghĩa. Cho rằng đối tượng có tính thẩm mỹ có nghĩa là ta thừa nhận ở nó có một thuộc tính khiến cho nó trở nên thú vị khi nhìn[...]”</p>
  <p style="font-size:12px;color:#6b7280"> (Trích đoạn ví dụ — Marc Jimenez, 50 câu hỏi mỹ học đương đại)</p>
`;

const PASSAGE_QUESTIONS: Question[] = [
  {
    id: "q-7",
    text: "Phong cách ngôn ngữ của đoạn trích là gì?",
    choices: [
      { id: "a", text: "Báo chí" },
      { id: "b", text: "Khoa học" },
      { id: "c", text: "Nghệ thuật" },
      { id: "d", text: "Chính luận" },
    ],
  },
  {
    id: "q-8",
    text: "Theo đoạn trích, từ 'mỹ học' bắt nguồn từ ý niệm nào?",
    choices: [
      { id: "a", text: "Khoa học của cảm xúc" },
      { id: "b", text: "Khoa học của cái đẹp" },
      { id: "c", text: "Nghệ thuật ứng dụng" },
      { id: "d", text: "Triết học thực tiễn" },
    ],
  },
  {
    id: "q-9",
    text: "Tác giả cho rằng những thuật ngữ 'mỹ học' và 'cái đẹp' hiện nay thường được xem:",
    choices: [
      { id: "a", text: "Hoàn toàn đồng nghĩa" },
      { id: "b", text: "Không liên quan" },
      { id: "c", text: "Có mối liên hệ bền bỉ" },
      { id: "d", text: "Là hai khái niệm trái ngược" },
    ],
  },
  {
    id: "q-10",
    text: "Việc thừa nhận một đối tượng có tính thẩm mỹ tức là gì theo đoạn trích?",
    choices: [
      { id: "a", text: "Thừa nhận tính khoa học của nó" },
      { id: "b", text: "Thừa nhận nó có thuộc tính khiến người ta thấy thú vị khi nhìn" },
      { id: "c", text: "Thừa nhận nó là vật quý hiếm" },
      { id: "d", text: "Thừa nhận tính lịch sử của nó" },
    ],
  },
];

const ExamAttemptPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const questions = useMemo(() => SAMPLE_QUESTIONS, []);

  // include passage-group questions in the answers map
  const allQuestionList = useMemo(
    () => [...questions, ...PASSAGE_QUESTIONS],
    [questions]
  );

  const [answers, setAnswers] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(allQuestionList.map((q) => [q.id, null]))
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

  // Refs for single questions and for passage-group questions (keeps order for jumping)
  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const groupQuestionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // helper: update answer for single / group
  const handleSelectSingle = (choiceId: string, qIndex: number) => {
    const qId = questions[qIndex].id;
    setAnswers((prev) => ({ ...prev, [qId]: choiceId }));
  };

  const handleSelectGroup = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const totalQuestions = allQuestionList.length;

  const handleJump = (index: number) => {
    setCurrentIndex(index);
    if (index < questions.length) {
      const el = questionRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      const groupIndex = index - questions.length;
      const el = groupQuestionRefs.current[groupIndex];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
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
          {/* Left: all questions (single questions first, then passage group) */}
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
                  onSelect={(choiceId: string) => handleSelectSingle(choiceId, idx)}
                />
              </div>
            ))}

            {/* Passage question group (rendered as a two-column block) */}
            <div className="rounded-md">
              <PassageQuestionGroup
                passageHtml={PASSAGE_HTML}
                questions={PASSAGE_QUESTIONS}
                startIndex={questions.length + 1} // numbering continues after single questions
                answers={answers}
                onSelect={handleSelectGroup}
                registerRef={(localIndex, el) => {
                  groupQuestionRefs.current[localIndex] = el;
                }}
              />
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="lg:col-span-4">
            <SidebarPanel
              total={totalQuestions}
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