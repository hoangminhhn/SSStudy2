"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface FloatingAskQuestionButtonProps {
  onClick?: () => void;
}

const FloatingAskQuestionButton: React.FC<FloatingAskQuestionButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      // Using sticky positioning to keep it visible within the scrollable left column
      // bottom-6 and right-6 will position it relative to the bottom-right of its sticky container
      className="sticky bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-2 z-50 ml-auto" // ml-auto to push it to the right
      onClick={onClick}
    >
      <MessageCircle size={20} />
      <span>Hỏi đáp</span>
    </Button>
  );
};

export default FloatingAskQuestionButton;