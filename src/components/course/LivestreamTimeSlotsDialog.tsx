"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TimeSlot {
  time: string;
  teacher: string;
  registrationStatus: 'register' | 'registered' | 'full';
}

interface LivestreamTimeSlotsDialogProps {
  children: React.ReactNode;
  sessionTitle: string;
  sessionDate: string;
  timeSlots: TimeSlot[];
}

const LivestreamTimeSlotsDialog: React.FC<LivestreamTimeSlotsDialogProps> = ({
  children,
  sessionTitle,
  sessionDate,
  timeSlots,
}) => {
  // Filter to only show available slots
  const availableTimeSlots = timeSlots.filter(slot => slot.registrationStatus === 'register');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-600">
            Đăng ký phòng học
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Chọn phòng học trống cho buổi học: <span className="font-semibold">{sessionTitle}</span> vào ngày <span className="font-semibold">{sessionDate}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex flex-col">
                  <div className="flex items-center text-gray-800 font-medium">
                    <Clock size={16} className="mr-2 text-blue-500" />
                    Livestream {index + 1}: {slot.time}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <User size={14} className="mr-2 text-gray-500" />
                    Giáo viên: <span className="font-semibold ml-1">{slot.teacher}</span>
                  </div>
                </div>
                <Button
                  className={`rounded-full px-4 py-2 text-sm ${
                    slot.registrationStatus === 'register'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : slot.registrationStatus === 'registered'
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-red-600 text-white cursor-not-allowed'
                  }`}
                  disabled={slot.registrationStatus !== 'register'}
                >
                  {slot.registrationStatus === 'register'
                    ? 'Đăng Ký'
                    : slot.registrationStatus === 'registered'
                    ? 'Đã đăng ký'
                    : 'Đầy'}
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Không có khung giờ nào khả dụng.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LivestreamTimeSlotsDialog;