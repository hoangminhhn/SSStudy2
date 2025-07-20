import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LessonDetailPage from "./pages/LessonDetailPage"; // Import the original page
import LessonDetailPageV2 from "./pages/LessonDetailPageV2"; // Import the new page
import CourseDetailPageV2 from "./pages/CourseDetailPageV2"; // Import the new CourseDetailPageV2

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/lesson/:lessonId" element={<LessonDetailPage />} /> {/* Original route */}
          <Route path="/lesson-v2/:lessonId" element={<LessonDetailPageV2 />} /> {/* New route for V2 */}
          <Route path="/course-v2/:courseId" element={<CourseDetailPageV2 />} /> {/* New route for CourseDetailPageV2 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;