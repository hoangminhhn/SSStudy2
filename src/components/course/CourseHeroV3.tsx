"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react"; // Import Star and StarHalf icons

interface CourseHeroV3Props {
  title: string;
  teacher: string;
  description: string;
  guarantees: string[];
  rating: number; // New prop for rating score
  ratingCount: number; // New prop for number of ratings
}

const CourseHeroV3: React.FC<CourseHeroV3Props> = ({
  title,
  teacher,
  description,
  guarantees,
  rating,
  ratingCount,
}) => {
  const renderStars = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={20} fill="#FFD700" stroke="#FFD700" className="text-yellow-500" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" size={20} fill="#FFD700" stroke="#FFD700" className="text-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={20} stroke="#FFD700" className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* First Card: Course general information */}
      <Card className="p-6 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold text-v3-text-default mb-2">{title}</h1>
        <p className="text-lg text-v3-text-muted mb-2">Thầy {teacher}</p>
        
        {/* Rating Section */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-yellow-500 mr-2">{rating.toFixed(1)}</span>
          {renderStars(rating)}
          <span className="text-v3-text-default ml-2">({ratingCount.toLocaleString()} ratings)</span>
        </div>

        <p className="text-v3-text-default mb-4">{description}</p>

        <div className="border-t border-v3-border pt-4">
          <h3 className="text-lg font-bold text-v3-text-default mb-3">
            Khóa học này dành cho ai?
          </h3>
          <ul className="space-y-2 text-v3-text-default">
            {guarantees.map((guarantee, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-v3-text-muted rounded-full flex-shrink-0 mt-2 mr-3"></span>
                <p className="text-sm">{guarantee}</p>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
};

export default CourseHeroV3;