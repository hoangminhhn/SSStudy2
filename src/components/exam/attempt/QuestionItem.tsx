"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Choice {
  id: string;
  text: string;
}

interface QuestionItemProps {
  choice: Choice;
  checked: boolean;
  onChange: (choiceId: string) => void;
  index: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ choice, checked, onChange, index }) => {
  return (
    <label
      className={cn(
        "w-full cursor-pointer rounded-lg p-3 border transition-shadow flex items-start gap-3",
        checked ? "border-blue-600 bg-blue-50 shadow-sm" : "border-gray-200 hover:shadow-sm"
      )}
    >
      <input
        type="radio"
        name="choice"
        checked={checked}
        onChange={() => onChange(choice.id)}
        className="mt-1"
        aria-label={`Chọn đáp án ${index + 1}`}
      />
      <div className="text-sm text-gray-800">{choice.text}</div>
    </label>
  );
};

export default QuestionItem;