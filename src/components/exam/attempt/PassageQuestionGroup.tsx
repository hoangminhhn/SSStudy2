"use client";

import React from "react";
import QuestionItem, { Choice } from "./QuestionItem";

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
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: Passage - sticky on desktop and sized to viewport height.
            If passage content is longer than viewport, it will scroll internally. */}
        <div
          className="p-6 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50
                     md:sticky md:top-0 md:h-screen md:overflow-auto"
          aria-hidden={false}
        >
          <div
            className="prose prose-sm text-sm text-gray-800"
            dangerouslySetInnerHTML={{ __html: passageHtml }}
          />
        </div>

        {/* Right: Questions - follow page scroll (no independent scroll on desktop) */}
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
    </div>
  );
};

export default PassageQuestionGroup;