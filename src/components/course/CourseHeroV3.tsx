"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, StarHalf } from "lucide-react"; // Import Star and StarHalf

interface CourseHeroV3Props {
  title: string;
  teacher: string;
  description: string;
  guarantees: string[];
  rating: number; // New prop for rating score
  numberOfRatings: number; // New prop for number of ratings
}

const CourseHeroV3: React.FC<CourseHeroV3Props> = ({
  title,
  teacher,
  description,
  guarantees,
  rating,
  numberOfRatings,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={20} fill="currentColor" className="text-amber-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={20} fill="currentColor" className="text-amber-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="space-y-8">
      {/* First Card: Course general information */}
      <Card className="p-6 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold text-v3-text-default mb-2">{title}</h1>
        <p className="text-lg text-v3-text-muted mb-2">Thầy {teacher}</p>
        
        {/* Rating Section */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-amber-400 mr-2">{rating.toFixed(1)}</span>
          <div className="flex mr-2">
            {renderStars(rating)}
          </div>
          <span className="text-v3-text-default text-sm underline">({numberOfRatings.toLocaleString()} ratings)</span>
        </div>

        <p className="text-v3-text-default mb-4">{description}</p>
      </Card>

      {/* Second Card: Guarantees */}
      <Card className="p-6 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold text-v3-text-default mb-4">
          Khóa học này đảm bảo
        </h2>
        <ul className="space-y-3">
          {guarantees.map((guarantee, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="text-v3-primary mr-3 flex-shrink-0 mt-1" size={20} />
              <p className="text-v3-text-default text-base">{guarantee}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default CourseHeroV3;