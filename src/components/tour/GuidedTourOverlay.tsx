"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TourStep {
  selector: string; // CSS selector for the element to highlight
  title: string; // Title for the instruction card
  description: string; // Description for the instruction card
  position: 'top' | 'bottom' | 'left' | 'right' | 'center'; // Position of the pop-up relative to the highlighted element
  offset?: { x: number; y: number }; // Optional offset for fine-tuning pop-up position
}

interface GuidedTourOverlayProps {
  isOpen: boolean;
  steps: TourStep[];
  currentStepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({
  isOpen,
  steps,
  currentStepIndex,
  onNext,
  onPrev,
  onClose,
}) => {
  if (!isOpen || steps.length === 0) {
    return null;
  }

  const currentStep = steps[currentStepIndex];
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = document.querySelector(currentStep.selector);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setHighlightRect(rect);

      // Scroll into view if not fully visible
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Re-calculate rect after scroll, if needed (e.g., for sticky headers)
      const handleScroll = () => {
        const newRect = targetElement.getBoundingClientRect();
        if (newRect.top !== rect.top || newRect.left !== rect.left) {
          setHighlightRect(newRect);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);

    } else {
      console.warn(`GuidedTour: Element with selector "${currentStep.selector}" not found.`);
      setHighlightRect(null);
    }
  }, [currentStep.selector, currentStepIndex]);

  // Calculate card position
  const getCardPosition = () => {
    if (!highlightRect || !cardRef.current) return {};

    const cardWidth = cardRef.current.offsetWidth;
    const cardHeight = cardRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (currentStep.position) {
      case 'top':
        top = highlightRect.top - cardHeight - 20; // 20px offset
        left = highlightRect.left + (highlightRect.width / 2) - (cardWidth / 2);
        break;
      case 'bottom':
        top = highlightRect.bottom + 20;
        left = highlightRect.left + (highlightRect.width / 2) - (cardWidth / 2);
        break;
      case 'left':
        top = highlightRect.top + (highlightRect.height / 2) - (cardHeight / 2);
        left = highlightRect.left - cardWidth - 20;
        break;
      case 'right':
        top = highlightRect.top + (highlightRect.height / 2) - (cardHeight / 2);
        left = highlightRect.right + 20;
        break;
      case 'center':
      default:
        top = (viewportHeight / 2) - (cardHeight / 2);
        left = (viewportWidth / 2) - (cardWidth / 2);
        break;
    }

    // Apply optional offset
    if (currentStep.offset) {
      top += currentStep.offset.y;
      left += currentStep.offset.x;
    }

    // Keep card within viewport (basic adjustment)
    top = Math.max(10, Math.min(top, viewportHeight - cardHeight - 10));
    left = Math.max(10, Math.min(left, viewportWidth - cardWidth - 10));

    return { top: `${top}px`, left: `${left}px` };
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      {/* Highlighted element "spotlight" */}
      {highlightRect && (
        <div
          className="absolute border-2 border-blue-400 rounded-lg pointer-events-none"
          style={{
            top: highlightRect.top,
            left: highlightRect.left,
            width: highlightRect.width,
            height: highlightRect.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)', // This creates the "hole" effect
            zIndex: 10000, // Ensure it's above the main overlay
          }}
        ></div>
      )}

      {/* Instruction Card */}
      <div
        ref={cardRef}
        className="absolute bg-white p-6 rounded-lg shadow-xl max-w-sm text-gray-800 pointer-events-auto z-[10001]" // Added z-[10001] here
        style={getCardPosition()}
      >
        <h3 className="font-bold text-lg mb-2">{currentStep.title}</h3>
        <p className="text-sm mb-4">{currentStep.description}</p>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <span
              key={index}
              className={cn(
                "block w-2 h-2 rounded-full",
                index === currentStepIndex ? "bg-orange-500" : "bg-gray-300"
              )}
            ></span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={currentStepIndex === 0}
            className="rounded-full px-4 py-2 text-sm"
          >
            Quay lại
          </Button>
          {currentStepIndex < steps.length - 1 ? (
            <Button
              onClick={onNext}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm"
            >
              Đi tiếp
            </Button>
          ) : (
            <Button
              onClick={onClose}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 text-sm"
            >
              Hoàn thành
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuidedTourOverlay;