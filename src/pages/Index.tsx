"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import StatsSection from "@/components/home/StatsSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import ChampionBoard from "@/components/home/ChampionBoard";
import UniqueValuesSection from "@/components/home/UniqueValuesSection";
import TeachersSection from "@/components/home/TeachersSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import ParentsFeedbackSection from "@/components/home/ParentsFeedbackSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import PartnersSection from "@/components/home/PartnersSection";
import PressSection from "@/components/home/PressSection";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <StatsSection />
        <ProgramsSection />
        <FeaturedCourses />
        <ChampionBoard />
        {/* Documents preview section added so the new page is visible from home */}
        <section aria-labelledby="documents-preview-heading" className="py-8 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-md flex flex-col sm:flex-row items-center justify-between">
              <CardContent className="p-0">
                <h2 id="documents-preview-heading" className="text-xl font-semibold text-gray-800">Tài liệu học tập</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Tập hợp tài liệu miễn phí và tài liệu dành cho học sinh đã mua khoá học — bài giảng, đề luyện,
                  tổng hợp công thức.
                </p>
              </CardContent>

              <div className="mt-4 sm:mt-0">
                <Link to="/tai-lieu">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2">
                    Khám phá Tài liệu
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
        {/* UniqueValuesSection placed directly under ChampionBoard as requested */}
        <UniqueValuesSection />
        {/* TeachersSection */}
        <TeachersSection />
        {/* ReviewsSection */}
        <ReviewsSection />
        {/* Parents Feedback section */}
        <ParentsFeedbackSection />
        {/* News & Events placed under Parents Feedback */}
        <NewsEventsSection />
        {/* Partners section placed under News & Events */}
        <PartnersSection />
        {/* Press / Báo chí section placed under Partners */}
        <PressSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;