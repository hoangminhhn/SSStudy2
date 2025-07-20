"use client";

import React from "react";
import { Link } from "react-router-dom";
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
  bgColor?: string; // e.g., "black", "white"
  textColor?: string; // e.g., "white", "black"
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ courseTitle, bgColor, textColor = "text-black" }) => {
  const navClasses = cn(
    "py-3 px-4",
    bgColor === "black" ? "bg-black" : "bg-white", // Apply background color
  );

  const linkClasses = cn(
    "hover:opacity-80 transition-opacity",
    textColor // Apply dynamic text color
  );

  return (
    <nav className={navClasses}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className={linkClasses}>
                Trang chủ
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/courses-v2" className={linkClasses}>
                Khóa học
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {courseTitle && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#" className={linkClasses}>
                    {courseTitle}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default BreadcrumbNav;