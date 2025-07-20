"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card"; // Import Card component

interface CourseHeroV2Props {
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePrice: string;
  originalPrice?: string;
  discountPercentage?: string;
  guarantees: string[];
  onRegisterClick: () => void;
  onWatchTrailerClick: () => void;
}

const CourseHeroV2: React.FC<CourseHeroV2Props> = ({
  courseTitle,
  courseDescription,
  courseImage,
  coursePrice,
  originalPrice,
  discountPercentage,
  guarantees,
  onRegisterClick,
  onWatchTrailerClick,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Course Details */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold text-v2-text-title mb-4">
            {courseTitle}
          </h1>
          <p className="text-lg text-v2-text-default mb-6">
            {courseDescription}
          </p>

          {/* Guarantees Section */}
          <h2 className="text-2xl font-semibold text-v2-text-title mb-4">
            Đảm bảo đầu ra
          </h2>
          <Card className="p-6 shadow-lg rounded-lg mb-8"> {/* Wrapped in Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guarantees.map((item, index) => (
                <div key={index} className="flex items-start text-v2-text-default">
                  <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Other sections can go here if needed */}
        </div>

        {/* Right Section: Course Image and Actions */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-end">
          <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={courseImage}
              alt={courseTitle}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-3xl font-bold text-v2-primary">
                  {coursePrice}
                </span>
                {originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {originalPrice}
                  </span>
                )}
                {discountPercentage && (
                  <span className="ml-auto bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    {discountPercentage}
                  </span>
                )}
              </div>
              <Button
                className="w-full bg-v2-primary hover:bg-v2-primary-dark text-white py-3 rounded-lg text-lg font-semibold mb-3 transition-colors duration-200"
                onClick={onRegisterClick}
              >
                Đăng ký ngay
              </Button>
              <Button
                variant="outline"
                className="w-full border-v2-primary text-v2-primary hover:bg-v2-primary-light hover:text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center transition-colors duration-200"
                onClick={onWatchTrailerClick}
              >
                <PlayCircle size={20} className="mr-2" />
                Xem giới thiệu khóa học
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeroV2;