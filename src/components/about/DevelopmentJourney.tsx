"use client";

import React from "react";

const DevelopmentJourney: React.FC = () => {
  return (
    <section aria-labelledby="development-journey-heading" className="py-12">
      <div className="container mx-auto px-4">
        <h2
          id="development-journey-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-6"
        >
          Chặng đường phát triển
        </h2>

        <div className="max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat.
          </p>

          <div className="w-full">
            <div className="mx-auto max-w-5xl">
              <img
                src="/images/changduong.png"
                alt="Chặng đường phát triển"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis viverra magna. Nulla mauris diam, ultricies sagittis feugiat sed, imperdiet at erat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentJourney;