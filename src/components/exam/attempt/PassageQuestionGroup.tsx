"use client";

import React, { useEffect, useRef, useState } from "react";
import QuestionItem, { Choice } from "./QuestionItem";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

interface PassageQuestionGroupProps {
  passageHtml: string;
  questions: Question[];
  startIndex: number; // used to number questions, e.g., startIndex = 7 -> Câu 7, Câu 8...
  answers: Record<string, string | null>;
  onSelect: (questionId: string, choiceId: string) => void;
  // registerRef will be called with (localIndex, el) so parent can keep refs for jumping
  registerRef?: (localIndex: number, el: HTMLDivElement | null) => void;
}

const PassageQuestionGroup: React.FC<PassageQuestionGroupProps> = ({
  passageHtml,
  questions,
  startIndex = 1,
  answers,
  onSelect,
  registerRef,
}) => {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const [isPassageVisible, setIsPassageVisible] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeader = () => {
      const headerEl = document.querySelector("header");
      const h = headerEl ? headerEl.getBoundingClientRect().height : 0;
      setHeaderHeight(h);
      if (leftRef.current) {
        leftRef.current.style.top = `${h}px`;
        leftRef.current.style.maxHeight = `calc(100vh - ${h}px)`;
      }
    };

    updateHeader();
    window.addEventListener("resize", updateHeader);
    window.addEventListener("load", updateHeader);

    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", updateHeader);
      window.removeEventListener("load", updateHeader);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    // If not mobile, always show the passage (no floating button)
    if (!isMobile) {
      setIsPassageVisible(true);
      return;
    }

    let rafId: number | null = null;
    const EARLY_TRIGGER = 160; // larger px value => button appears earlier as passage starts to scroll up

    const checkVisibility = () => {
      if (!leftRef.current) return;

      const rect = leftRef.current.getBoundingClientRect();
      const top = rect.top;
      const height = rect.height;
      const viewportH = window.innerHeight;

      // compute approximate intersection height
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, viewportH);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const intersectRatio = height > 0 ? visibleHeight / height : 0;

      // If the top of the passage is still sufficiently below the header (more than EARLY_TRIGGER),
      // consider it visible. Otherwise, if it has crossed above header - show button (i.e., not visible).
      // Also treat it as visible if intersection ratio is meaningful (> 5%).
      const stillBelowHeader = top > headerHeight + EARLY_TRIGGER;
      const isVisible = stillBelowHeader || intersectRatio > 0.05;

      setIsPassageVisible(isVisible);
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        checkVisibility();
        rafId = null;
      });
    };

    // initial check
    checkVisibility();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile, headerHeight]);

  const numStart = startIndex;
  const numEnd = startIndex + questions.length - 1;
  const buttonLabel = `Đề bài câu ${numStart} - ${numEnd}`;

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-start">
        {/* Left: Passage - sticky on desktop and sized to viewport height.
            If passage content is longer than viewport, it will scroll internally. */}
        <div
          ref={leftRef}
          // keep sticky behavior via CSS class; top/maxHeight are set dynamically in effect above
          className="p-6 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50 md:sticky md:overflow-auto"
          aria-hidden={false}
        >
          <div
            className="prose prose-sm text-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: passageHtml }}
          />
        </div>

        {/* Right: Questions - follow page scroll (no independent scrolling by default) */}
        <div className="p-6 space-y-4 bg-white">
          {questions.map((q, idx) => {
            const globalNumber = startIndex + idx;
            return (
              <div
                key={q.id}
                ref={(el) => registerRef?.(idx, el)}
                className="bg-white rounded-md p-3 border border-gray-100 shadow-sm"
                role="group"
                aria-labelledby={`q-${q.id}-label`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div id={`q-${q.id}-label`} className="text-sm font-semibold text-gray-800">
                      Câu {globalNumber} <span className="text-xs font-normal text-gray-500">(Trắc nghiệm)</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Mã: {q.id}</div>
                </div>

                <div className="text-sm text-gray-800 mb-3" dangerouslySetInnerHTML={{ __html: q.text }} />

                <div className="grid gap-2">
                  {q.choices.map((c, choiceIdx) => (
                    <QuestionItem
                      key={c.id}
                      choice={c}
                      index={choiceIdx}
                      checked={answers[q.id] === c.id}
                      onChange={(choiceId) => onSelect(q.id, choiceId)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: show fixed button near top (under header) when passage has been scrolled above header */}
      {isMobile && !isPassageVisible && (
        <>
          <button
            onClick={() => setOpenDialog(true)}
            aria-expanded={openDialog}
            aria-controls="passage-dialog"
            // fixed under header; headerHeight measured dynamically
            style={{ top: headerHeight + 8 }}
            className="fixed left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3"
          >
            <span className="text-sm font-medium">{buttonLabel}</span>
          </button>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent id="passage-dialog" className="max-w-lg w-[95vw] p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Đề bài (câu {numStart} - {numEnd})</h3>
                <Button variant="ghost" size="icon" onClick={() => setOpenDialog(false)} aria-label="Đóng đề">
                  <X />
                </Button>
              </div>

              <div className="max-h-[70vh] overflow-auto prose prose-sm text-sm text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: passageHtml }} />
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={() => setOpenDialog(false)} className="rounded-full">
                  Đóng
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default PassageQuestionGroup;