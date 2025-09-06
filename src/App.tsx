import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"; // This is now the Home Page
import CourseListingPage from "./pages/CourseListingPage"; // New Course Listing Page
import CourseListingPageV2 from "./pages/CourseListingPageV2"; // V2 Course Listing Page
import CourseDetailPage from "./pages/CourseDetailPage"; // Course Detail Page
import LessonDetailPage from "./pages/LessonDetailPage";
import LessonDetailPageV2 from "./pages/LessonDetailPageV2";
import CourseDetailPageV2 from "./pages/CourseDetailPageV2"; // Import the new V2 page
import CourseDetailPageV3 from "./pages/CourseDetailPageV3"; // Import the new V3 page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} /> {/* Home Page */}
          <Route path="/courses" element={<CourseListingPage />} /> {/* Course Listing Page */}
          <Route path="/courses-v2" element={<CourseListingPageV2 />} /> {/* NEW: Course Listing Page V2 */}
          <Route path="/courses/:courseId" element={<CourseDetailPage />} /> {/* Course Detail Page */}
          <Route path="/courses-v2/:courseId" element={<CourseDetailPageV2 />} /> {/* New Course Detail Page V2 */}
          <Route path="/courses-v3/:courseId" element={<CourseDetailPageV3 />} /> {/* New Course Detail Page V3 */}
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
          <Route path="/lesson-v2/:lessonId" element={<LessonDetailPageV2 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;