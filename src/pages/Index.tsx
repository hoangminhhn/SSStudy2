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
      </main>
      <Footer />
    </div>
  );
};

export default Index;