"use client";

import React from "react";
import QuestionItem, { Choice } from "./QuestionItem";

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
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  question,
  index,
  total,
  selectedChoiceId,
  onSelect,
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
        <div className="text-sm font-medium text-gray-700 mb-2">Câu {index + 1}:</div>
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
    </div>
  );
};

export default QuestionPanel;