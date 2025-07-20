"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CourseBenefitsProps {
  benefits: string[];
}

const CourseBenefits: React.FC<CourseBenefitsProps> = ({ benefits }) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start text-gray-700">
            <CheckCircle size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
            <p className="leading-relaxed">{benefit}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CourseBenefits;