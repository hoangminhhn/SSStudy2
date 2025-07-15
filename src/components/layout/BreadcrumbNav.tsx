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

interface BreadcrumbNavProps {
  courseTitle?: string;
  lessonTitle?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ courseTitle, lessonTitle }) => {
  return (
    <div className="bg-orange-500 py-3 px-6 text-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="text-white hover:text-gray-200">
                Trang Chủ
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4 text-white" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/courses" className="text-white hover:text-gray-200">
                Khóa học
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {courseTitle && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-white" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="text-white font-semibold">
                  {courseTitle}
                </span>
              </BreadcrumbItem>
            </>
          )}
          {lessonTitle && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4 text-white" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="text-white font-semibold">
                  {lessonTitle}
                </span>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;