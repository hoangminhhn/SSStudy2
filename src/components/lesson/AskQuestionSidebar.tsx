"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, ThumbsUp, MoreHorizontal } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  timeAgo: string;
  content: string;
  likes?: number;
}

interface AskQuestionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  comments?: Comment[];
}

const dummyComments: Comment[] = [
  {
    id: "comment-1",
    author: "Nguyễn Văn A",
    timeAgo: "2 ngày trước",
    content: "Thầy ơi, em vẫn chưa hiểu rõ phần biến đổi lượng giác ở buổi 1. Thầy có thể giải thích thêm một ví dụ được không ạ?",
    likes: 3,
  },
  {
    id: "comment-2",
    author: "Trần Thị B",
    timeAgo: "1 tuần trước",
    content: "Bài tập về hàm số mũ loga khá khó, có bạn nào có mẹo làm nhanh không?",
    likes: 5,
  },
  {
    id: "comment-3",
    author: "Lê Văn C",
    timeAgo: "3 tuần trước",
    content: "Phần nguyên hàm tích phân em thấy hơi nặng, có cách nào để học hiệu quả hơn không ạ?",
  },
  {
    id: "comment-4",
    author: "Phạm Thị D",
    timeAgo: "1 tháng trước",
    content: "Em muốn hỏi về bài toán lãi suất kép, công thức áp dụng trong trường hợp nào là đúng nhất ạ?",
    likes: 2,
  },
  {
    id: "comment-5",
    author: "Hoàng Minh E",
    timeAgo: "2 tháng trước",
    content: "Video bài giảng rất dễ hiểu, cảm ơn thầy cô và SSStudy!",
    likes: 10,
  },
  {
    id: "comment-6",
    author: "Đỗ Thị F",
    timeAgo: "3 tháng trước",
    content: "Có bạn nào đã làm xong bài tập về giới hạn hàm số chưa? Cho mình xin gợi ý với!",
  },
];

const AskQuestionSidebar: React.FC<AskQuestionSidebarProps> = ({
  isOpen,
  onClose,
  comments = dummyComments,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="pb-4 border-b border-gray-200">
          <SheetTitle className="text-2xl font-bold text-gray-800">Hỏi đáp</SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <User size={40} className="text-gray-400 bg-gray-100 rounded-full p-2" />
            <Input
              placeholder="Nhập bình luận mới của bạn"
              className="flex-grow rounded-full py-2 px-4 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
          <div className="flex justify-between items-center text-gray-700 text-sm font-medium">
            <span>{comments.length} bình luận</span>
            <span className="text-gray-500 text-xs">
              Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
            </span>
          </div>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <User size={32} className="text-gray-400 bg-gray-100 rounded-full p-1 flex-shrink-0" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">{comment.author}</span>
                    <span className="text-gray-500 text-xs">{comment.timeAgo}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <Button variant="ghost" className="p-0 h-auto text-sm hover:underline">
                      Thích
                    </Button>
                    <Button variant="ghost" className="p-0 h-auto text-sm hover:underline">
                      Phản hồi
                    </Button>
                    {comment.likes !== undefined && comment.likes > 0 && (
                      <div className="flex items-center space-x-1 ml-auto">
                        <ThumbsUp size={14} className="text-blue-500" />
                        <span>{comment.likes}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="p-0 h-auto text-gray-500 hover:text-gray-700">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">Chưa có bình luận nào.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AskQuestionSidebar;