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
      className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-2 z-50"
      onClick={onClick}
    >
      <MessageCircle size={20} />
      <span>Hỏi đáp</span>
    </Button>
  );
};

export default FloatingAskQuestionButton;