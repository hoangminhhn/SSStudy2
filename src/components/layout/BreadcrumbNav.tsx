"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  courseTitle?: string;
  bgColor?: string;
  textColorClass?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ courseTitle = "Thi thử", bgColor, textColorClass }) => {
  const location = useLocation();

  // Hide breadcrumb on the exam attempt page
  if (location.pathname.includes("/thi-thu/") && location.pathname.includes("/attempt")) {
    return null;
  }

  const bgClass = bgColor ? `bg-${bgColor}` : "bg-orange-500";

  return (
    <div className={cn("py-3", bgClass, textColorClass)}>
      <div className="container mx-auto px-4">
        <nav className="text-sm text-gray-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">Trang chủ</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700">{courseTitle}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbNav;