"use client";

import React from "react";
import QuestionItem, { Choice } from "./QuestionItem";
import { Button } from "@/components/ui/button";

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

interface QuestionPanelProps {
  question: Question;
  index: number;
  total: number;
  selectedChoiceId?: string | null;
  onSelect: (choiceId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  index,
  total,
  selectedChoiceId,
  onSelect,
  onNext,
  onPrev,
  onSubmit,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mt-1">Nội dung câu hỏi</h3>
        </div>
        <div className="text-sm text-gray-500">Mã: {question.id}</div>
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
        <div className="text-base text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: question.text }} />
        <div className="grid gap-3">
          {question.choices.map((c, i) => (
            <QuestionItem
              key={c.id}
              choice={c}
              index={i}
              checked={selectedChoiceId === c.id}
              onChange={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full px-4 py-2"
            onClick={onPrev}
            disabled={index === 0}
          >
            Trước
          </Button>
          <Button
            className="rounded-full px-4 py-2"
            onClick={onNext}
            disabled={index === total - 1}
          >
            Tiếp
          </Button>
        </div>

        <div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2"
            onClick={onSubmit}
            aria-label="Nộp bài"
          >
            Nộp bài
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;