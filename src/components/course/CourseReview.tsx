"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const CourseReview = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">ĐÁNH GIÁ KHÓA HỌC</h2>

      <Card className="p-6 shadow-sm rounded-lg mb-6">
        <p className="text-center text-gray-600 font-medium">
          Chưa có đánh giá nào! Hãy là người đầu tiên gửi đánh giá cho chúng tôi!
        </p>
      </Card>

      <Card className="p-6 shadow-sm rounded-lg">
        <Input
          placeholder="Nhập nội dung bình luận"
          className="mb-4"
        />
        <Textarea
          placeholder="Nhập nội dung bình luận"
          className="mb-4 min-h-[100px]"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-gray-700 font-medium mr-2">Đánh giá:</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors" />
            ))}
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3">
            Gửi đánh giá <Send size={16} className="ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseReview;