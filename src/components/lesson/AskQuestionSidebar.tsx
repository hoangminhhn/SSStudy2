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
    author: "Diego Nguyen",
    timeAgo: "3 tháng trước",
    content: "wow import",
  },
  {
    id: "comment-2",
    author: "Đạt Nguyễn",
    timeAgo: "8 tháng trước",
    content: "sử dụng 2x thì lại bị nói là học nhanh hơn , mặc dù đang cần học nhanh",
    likes: 1,
  },
  {
    id: "comment-3",
    author: "Văn Dung Phạm",
    timeAgo: "một năm trước",
    content: "Mình ấn F12 suốt xong chả biết làm gì nữa nay đã biết rồi K KKK. Tks Admin Sơn",
  },
  {
    id: "comment-4",
    author: "phạm hoa",
    timeAgo: "2 năm trước",
    content: "where is note?",
  },
  {
    id: "comment-5",
    author: "Nguyễn Thị Thảo",
    timeAgo: "1 tuần trước",
    content: "Bài giảng rất hay và dễ hiểu, cảm ơn thầy!",
    likes: 5,
  },
  {
    id: "comment-6",
    author: "Lê Văn An",
    timeAgo: "2 ngày trước",
    content: "Em có một câu hỏi về phần bài tập số 3, thầy có thể giải thích rõ hơn không ạ?",
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