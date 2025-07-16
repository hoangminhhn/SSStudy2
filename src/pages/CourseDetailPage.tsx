"use client";

import React from "react";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CourseHero from "@/components/course/CourseHero";
import CourseContent from "@/components/course/CourseContent";
import CourseReview from "@/components/course/CourseReview";
import Footer from "@/components/layout/Footer";

const CourseDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav />
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