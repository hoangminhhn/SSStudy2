"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import QuestionPanel, { Question } from "@/components/exam/attempt/QuestionPanel";
import SidebarPanel from "@/components/exam/attempt/SidebarPanel";
import PassageQuestionGroup from "@/components/exam/attempt/PassageQuestionGroup";
import { showSuccess } from "@/utils/toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Passage groups (three groups including the very long one)
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

const LONG_PASSAGE_HTML = `
  <h4>Đề bài dài (ví dụ) — Nghiên cứu trường hợp: Tác động của biến đổi khí hậu tới hệ sinh thái ven biển</h4>
  <p>Trong vài thập kỷ gần đây, biến đổi khí hậu đã và đang gây ra nhiều ảnh hưởng nghiêm trọng tới các hệ sinh thái ven biển. Sự gia tăng mực nước biển, hiện tượng xâm nhập mặn, tần suất bão mạnh hơn và biến động nhiệt độ nước đều là những yếu tố khiến hệ sinh thái này thay đổi nhanh chóng. Các rạn san hô đang bị tẩy trắng khi nhiệt độ nước tăng cao; vùng đầm lầy bị thu hẹp do xâm nhập mặn; và nhiều loài sinh vật phải di cư hoặc đối mặt với nguy cơ tuyệt chủng.</p>
  <p>Người ta cũng nhận thấy rằng hoạt động nuôi trồng thủy sản công nghiệp tại các vùng ven biển có thể làm tăng áp lực lên các hệ sinh thái tự nhiên: ô nhiễm dinh dưỡng từ phân và thức ăn thừa làm giảm oxy hòa tan, trong khi việc san lấp và xây dựng cơ sở hạ tầng phá vỡ môi trường sống của các loài bản địa. Các giải pháp thích ứng có thể bao gồm phục hồi đầm lầy, thiết lập khu bảo tồn biển, và áp dụng kỹ thuật nuôi trồng bền vững nhằm giảm thiểu tác động môi trường.</p>
  <p>Yêu cầu: Đọc kỹ đoạn văn trên và trả lời các câu hỏi sau. Chú ý phân tích kỹ nguyên nhân và hậu quả trước khi chọn đáp án.</p>
`;

const LONG_PASSAGE_QUESTIONS: Question[] = [
  {
    id: "q-11",
    text: "Theo đoạn văn, yếu tố nào KHÔNG được nêu là nguyên nhân trực tiếp làm thay đổi hệ sinh thái ven biển?",
    choices: [
      { id: "a", text: "Gia tăng mực nước biển" },
      { id: "b", text: "Hoạt động du lịch ven biển" },
      { id: "c", text: "Xâm nhập mặn" },
      { id: "d", text: "Tần suất bão mạnh hơn" },
    ],
  },
  {
    id: "q-12",
    text: "Tác động của nhiệt độ nước tăng lên các rạn san hô được miêu tả là:",
    choices: [
      { id: "a", text: "Làm tăng đa dạng sinh học" },
      { id: "b", text: "Gây tẩy trắng san hô" },
      { id: "c", text: "Tăng sản lượng thủy sản" },
      { id: "d", text: "Không có ảnh hưởng đáng kể" },
    ],
  },
  {
    id: "q-13",
    text: "Trong đoạn văn, 'ô nhiễm dinh dưỡng' đặc biệt do nguồn nào gây ra?",
    choices: [
      { id: "a", text: "Nước thải sinh hoạt" },
      { id: "b", text: "Phân và thức ăn thừa từ nuôi trồng thủy sản" },
      { id: "c", text: "Khí thải công nghiệp" },
      { id: "d", text: "Dầu tràn" },
    ],
  },
  {
    id: "q-14",
    text: "Một trong các giải pháp thích ứng đề cập tới là:",
    choices: [
      { id: "a", text: "Tăng cường san lấp để làm bờ biển cao hơn" },
      { id: "b", text: "Phục hồi đầm lầy và thiết lập khu bảo tồn biển" },
      { id: "c", text: "Khuyến khích nuôi trồng thủy sản công nghiệp mở rộng" },
      { id: "d", text: "Xây dựng nhiều cảng hơn" },
    ],
  },
];

const EXTRA_LONG_PASSAGE_HTML = `
  <h3>Đề bài rất dài (ví dụ demo) — Bài đọc phân tích: Hậu quả xã hội và kinh tế của tự động hóa trong ngành sản xuất</h3>

  <p>Trong hơn một thế kỷ qua, tiến trình tự động hóa đã thay đổi căn bản cách mà các ngành sản xuất vận hành. Từ việc sử dụng các máy móc đơn giản hỗ trợ sức lao động đến việc triển khai hệ thống robot tự động và trí tuệ nhân tạo, năng suất lao động tăng nhanh đã đem lại cả lợi ích lẫn thách thức cho xã hội. Bài viết này sẽ phân tích sâu về các khía cạnh kinh tế, việc làm, và chính sách xã hội liên quan tới tự động hóa.</p>

  <p><strong>1. Tác động kinh tế</strong></p>
  <p>Tự động hóa làm giảm chi phí sản xuất trên mỗi đơn vị, tăng năng suất và có thể làm giảm giá thành cho người tiêu dùng. Tuy nhiên, việc áp dụng rộng rãi các công nghệ thay thế lao động con người có thể dẫn tới phân hóa thu nhập: lợi nhuận tập trung về phía chủ sở hữu vốn và doanh nghiệp có năng lực đầu tư, trong khi người lao động ít kỹ năng dễ bị mất việc làm hoặc phải chấp nhận công việc có thu nhập thấp hơn.</p>

  <p><strong>2. Thay đổi cơ cấu việc làm</strong></p>
  <p>Một số ngành nghề truyền thống suy giảm, trong khi các công việc liên quan tới thiết kế, vận hành và bảo trì hệ thống tự động gia tăng. Điều này đòi hỏi quá trình tái đào tạo (reskilling) và nâng cao kỹ năng liên tục để người lao động bắt kịp nhu cầu thị trường. Các chính sách giáo dục cần ưu tiên kỹ năng số, tư duy phân tích và khả năng sáng tạo.</p>

  <p><strong>3. Hệ quả xã hội</strong></p>
  <p>Sự mất việc tạm thời có thể khiến nhiều gia đình rơi vào khó khăn tài chính, làm tăng áp lực lên các quỹ an sinh xã hội. Để giảm thiểu rủi ro, một số quốc gia đã thử nghiệm các chương trình hỗ trợ thu nhập cơ bản, trợ cấp đào tạo, hoặc chính sách thuế nhằm phân phối lại lợi ích từ tự động hóa.</p>

  <p><strong>4. Các ví dụ thực tiễn</strong></p>
  <p>Ở một số khu vực, như vùng công nghiệp cao tự động hóa, người lao động đã chuyển sang các vị trí có giá trị gia tăng cao hơn: kiểm soát chất lượng bằng cảm biến thông minh, phân tích dữ liệu sản xuất và tối ưu hóa chuỗi cung ứng. Ngược lại, ở các vùng ít tiếp cận công nghệ, tự động hóa nhanh có thể dẫn tới thất nghiệp và rối loạn xã hội nếu không có chính sách kịp thời.</p>

  <p><strong>5. Hướng đi chính sách</strong></p>
  <p>Để đạt được chuyển đổi kinh tế bền vững, các nhà hoạch định chính sách nên cân nhắc kết hợp: (i) đầu tư vào giáo dục và đào tạo kỹ năng mới; (ii) triển khai các chương trình bảo hiểm việc làm tạm thời; (iii) khuyến khích doanh nghiệp chia sẻ lợi ích thông qua các chương trình lợi tức cho nhân viên; và (iv) thử nghiệm các cơ chế phân phối thu nhập như thuế thu nhập doanh nghiệp tiến bộ.</p>

  <p><em>Ghi chú:</em> Đoạn bài đọc trên nhằm mục đích mô phỏng một bài đọc dài trong đề thi để kiểm tra hiển thị, cuộn và trải nghiệm người dùng khi đọc đề dài trong popup trên thiết bị di động.</p>
`;

const EXTRA_LONG_PASSAGE_QUESTIONS: Question[] = [
  {
    id: "q-21",
    text: "Theo bài đọc, một trong những hệ quả kinh tế chính của tự động hóa là:",
    choices: [
      { id: "a", text: "Tăng giá thành sản phẩm" },
      { id: "b", text: "Giảm chi phí sản xuất trên mỗi đơn vị" },
      { id: "c", text: "Giảm lợi nhuận doanh nghiệp" },
      { id: "d", text: "Giảm nhu cầu tiêu dùng" },
    ],
  },
  {
    id: "q-22",
    text: "Bài đọc nhấn mạnh rằng người lao động cần ưu tiên phát triển kỹ năng nào để thích ứng?",
    choices: [
      { id: "a", text: "Kỹ năng số và tư duy phân tích" },
      { id: "b", text: "Kỹ năng ngoại ngữ cổ điển" },
      { id: "c", text: "Kỹ năng thủ công truyền thống" },
      { id: "d", text: "Không cần kỹ năng mới" },
    ],
  },
  {
    id: "q-23",
    text: "Một chính sách được đề xuất để giảm thiểu tác động xã hội tiêu cực là:",
    choices: [
      { id: "a", text: "Giảm đầu tư giáo dục" },
      { id: "b", text: "Thử nghiệm chương trình hỗ trợ thu nhập cơ bản" },
      { id: "c", text: "Khuyến khích sa thải hàng loạt" },
      { id: "d", text: "Tăng giờ làm cho người lao động" },
    ],
  },
  {
    id: "q-24",
    text: "Bài đọc đưa ra ví dụ rằng tự động hóa có thể dẫn đến:",
    choices: [
      { id: "a", text: "Tăng thất nghiệp ở mọi khu vực mà không có ngoại lệ" },
      { id: "b", text: "Thay đổi cơ cấu việc làm: giảm một số nghề, tăng nghề kỹ thuật số" },
      { id: "c", text: "Giảm năng suất lao động" },
      { id: "d", text: "Loại bỏ nhu cầu đào tạo" },
    ],
  },
];

const ExamAttemptPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const questions = useMemo(() => SAMPLE_QUESTIONS, []);

  // include all passage-group questions in the answers map
  const allQuestionList = useMemo(
    () => [...questions, ...PASSAGE_QUESTIONS, ...LONG_PASSAGE_QUESTIONS, ...EXTRA_LONG_PASSAGE_QUESTIONS],
    [questions]
  );

  const [answers, setAnswers] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(allQuestionList.map((q) => [q.id, null]))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sidebar visibility state: when false, main column becomes full width
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
      <main className="flex-grow container mx-auto px-4 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: all questions (single questions first, then passage groups) */}
          <div className={isSidebarVisible ? "lg:col-span-8 space-y-6" : "lg:col-span-12 space-y-6"}>
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

            {/* Passage question group (first group) */}
            <div className="rounded-md">
              <PassageQuestionGroup
                passageHtml={PASSAGE_HTML}
                questions={PASSAGE_QUESTIONS}
                startIndex={questions.length + 1} // numbering continues after single questions
                answers={answers}
                onSelect={handleSelectGroup}
                registerRef={(localIndex, el) => {
                  // register refs into flat groupQuestionRefs (first group's questions start at 0)
                  groupQuestionRefs.current[localIndex] = el;
                }}
              />
            </div>

            {/* Long passage question group (second group) */}
            <div className="rounded-md">
              <PassageQuestionGroup
                passageHtml={LONG_PASSAGE_HTML}
                questions={LONG_PASSAGE_QUESTIONS}
                startIndex={questions.length + PASSAGE_QUESTIONS.length + 1}
                answers={answers}
                onSelect={handleSelectGroup}
                registerRef={(localIndex, el) => {
                  // second group's refs are appended after the first group's length
                  const offset = PASSAGE_QUESTIONS.length;
                  groupQuestionRefs.current[offset + localIndex] = el;
                }}
              />
            </div>

            {/* EXTRA: Very long passage group (third group) */}
            <div className="rounded-md">
              <PassageQuestionGroup
                passageHtml={EXTRA_LONG_PASSAGE_HTML}
                questions={EXTRA_LONG_PASSAGE_QUESTIONS}
                startIndex={questions.length + PASSAGE_QUESTIONS.length + LONG_PASSAGE_QUESTIONS.length + 1}
                answers={answers}
                onSelect={handleSelectGroup}
                registerRef={(localIndex, el) => {
                  // third group's refs appended after the first two groups
                  const offset = PASSAGE_QUESTIONS.length + LONG_PASSAGE_QUESTIONS.length;
                  groupQuestionRefs.current[offset + localIndex] = el;
                }}
              />
            </div>
          </div>

          {/* Right: sidebar (hidden when isSidebarVisible is false) */}
          {isSidebarVisible && (
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
          )}
        </div>
      </main>

      {/* Fixed bottom navigation (no footer on the exam page) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-200 py-3 px-4 safe-area-inset-bottom"
        aria-label="Exam actions"
      >
        <div className="max-w-7xl mx-auto flex items-center">
          {/* center spacer */}
          <div className="flex-1" />

          {/* Place the toggle at the right edge (user requested position) */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsSidebarVisible((s) => !s)}
              className="rounded-full px-4 py-2 flex items-center gap-2"
              aria-pressed={!isSidebarVisible}
              aria-label={isSidebarVisible ? "Ẩn cột nộp bài" : "Hiện cột nộp bài"}
            >
              {isSidebarVisible ? (
                <>
                  Ẩn cột nộp bài
                  <ChevronRight />
                </>
              ) : (
                <>
                  Hiện cột nộp bài
                  <ChevronLeft />
                </>
              )}
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ExamAttemptPage;