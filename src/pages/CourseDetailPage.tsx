"use client";

import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CourseHero from "@/components/course/CourseHero";
import CourseContent from "@/components/course/CourseContent";
import CourseReview from "@/components/course/CourseReview";
import Footer from "@/components/layout/Footer";

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Get courseId from URL

  // In a real application, you would fetch course data based on courseId here.
  // For now, we'll just display a generic course or use the existing dummy data.
  // The current CourseHero and CourseContent components don't dynamically load data based on courseId,
  // so this page will still show the same content, but its URL will be dynamic.

  // You might want to add a check if courseId is valid and display a "Course Not Found" if not.
  // For this example, we'll assume a valid courseId leads to this page.

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav
        courseTitle={courseId ? `Khóa học: ${courseId}` : "Chi tiết khóa học"} // Display courseId in breadcrumb
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CourseHero />
        <CourseContent />
        <CourseReview />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;