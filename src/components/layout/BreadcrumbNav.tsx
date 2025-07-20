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
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ courseTitle, lessonTitle, bgColor }) => {
  return (
    <div className={cn("py-3 text-black", bgColor ? `bg-${bgColor}` : "bg-orange-500")}>
      <div className="container mx-auto px-4"> {/* Added container mx-auto px-4 for alignment */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-black hover:text-gray-700">
                  Trang Chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4 text-black" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/courses" className="text-black hover:text-gray-700">
                  Khóa học
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {courseTitle && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-black" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className="text-black font-semibold">
                    {courseTitle}
                  </span>
                </BreadcrumbItem>
              </>
            )}
            {lessonTitle && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-black" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <span className="text-black font-semibold">
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