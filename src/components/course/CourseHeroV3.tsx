"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Share2, Heart } from "lucide-react";

interface CourseHeroV3Props {
  title: string;
  teacher: string;
  description: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: string;
  onRegisterClick: () => void;
  onTrialClick: () => void;
}

const CourseHeroV3: React.FC<CourseHeroV3Props> = ({
  title,
  teacher,
  description,
  imageUrl,
  price,
  originalPrice,
  discountPercentage,
  onRegisterClick,
  onTrialClick,
}) => {
  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <div className="w-full lg:w-2/3 text-center lg:text-left">
          <h1 className="text-xl font-bold text-v3-text-default mb-2">{title}</h1>
          <p className="text-lg text-v3-text-muted mb-4">Thầy {teacher}</p>
          <p className="text-v3-text-default mb-4">{description}</p>
          <div className="flex items-center text-v3-text-muted text-sm space-x-4">
            <div className="flex items-center">
              <PlayCircle className="mr-1" size={18} />
              <span>24 bài giảng</span>
            </div>
            <div className="flex items-center">
              <Share2 className="mr-1" size={18} />
              <span>Chia sẻ</span>
            </div>
            <div className="flex items-center">
              <Heart className="mr-1" size={18} />
              <span>Yêu thích</span>
            </div>
          </div>
        </div>

        <Card className="w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-lg flex flex-col items-center lg:items-start">
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
          <div className="w-full text-center lg:text-left mb-4">
            <div className="flex items-baseline justify-center lg:justify-start mb-1">
              <span className="text-3xl font-bold text-blue-600 mr-2">{price}</span>
              {originalPrice && (
                <span className="text-lg text-gray-500 line-through">{originalPrice}</span>
              )}
            </div>
            {discountPercentage && (
              <span className="text-sm text-red-500 font-semibold">{discountPercentage}</span>
            )}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mb-3 transition-colors" onClick={onRegisterClick}>
            Đăng ký học
          </Button>
          <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors" onClick={onTrialClick}>
            Học thử miễn phí
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CourseHeroV3;