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
        {/* UniqueValuesSection placed directly under ChampionBoard as requested */}
        <UniqueValuesSection />
        {/* TeachersSection */}
        <TeachersSection />
        {/* New ReviewsSection placed under TeachersSection */}
        <ReviewsSection />
        {/* Parents Feedback section */}
        <ParentsFeedbackSection />
        {/* News & Events placed under Parents Feedback */}
        <NewsEventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;