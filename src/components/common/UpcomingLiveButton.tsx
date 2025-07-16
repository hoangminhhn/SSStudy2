"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LiveTv } from "lucide-react"; // Using LiveTv for a live icon
import { findNextLiveSession } from "@/utils/liveSessionUtils";
import { Chapter } from "@/data/courseData";

interface UpcomingLiveButtonProps {
  chaptersData: Chapter[];
}

const UpcomingLiveButton: React.FC<UpcomingLiveButtonProps> = ({ chaptersData }) => {
  const [nextLiveSessionId, setNextLiveSessionId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const nextSession = findNextLiveSession(chaptersData);
    if (nextSession) {
      setNextLiveSessionId(nextSession.sessionId);
    } else {
      setNextLiveSessionId(undefined);
    }
  }, [chaptersData]);

  return (
    <Button
      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 text-sm flex items-center space-x-2"
      disabled={!nextLiveSessionId}
      asChild={!!nextLiveSessionId}
    >
      {nextLiveSessionId ? (
        <Link to={`/lesson-v2/${nextLiveSessionId}`}>
          <LiveTv size={16} className="mr-2" />
          Buổi live sắp tới
        </Link>
      ) : (
        <>
          <LiveTv size={16} className="mr-2" />
          Không có buổi live sắp tới
        </>
      )}
    </Button>
  );
};

export default UpcomingLiveButton;