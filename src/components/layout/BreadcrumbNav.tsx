"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  courseTitle?: string;
  lessonTitle?: string;
  bgColor?: string;
  variant?: "default" | "v2"; // New prop for variant styling
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ courseTitle, lessonTitle, bgColor, variant = "default" }) => {
  const textColorClass = variant === "v2" ? "text-black" : "text-white";

  return (
    <div className={cn("py-3", bgColor ? `bg-${bgColor}` : "bg-orange-500", textColorClass)}>
      <div className="container mx-auto px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className={cn(textColorClass, "hover:text-gray-700")}>
                  Trang Chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className={cn("h-4 w-4", textColorClass)} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/courses" className={cn(textColorClass, "hover:text-gray-700")}>
                  Khóa học
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {courseTitle && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className={cn("h-4 w-4", textColorClass)} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className={cn(textColorClass, "font-semibold")}>
                    {courseTitle}
                  </span>
                </BreadcrumbItem>
              </>
            )}
            {lessonTitle && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className={cn("h-4 w-4", textColorClass)} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className={cn(textColorClass, "font-semibold")}>
                    {lessonTitle}
                  </span>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNav;