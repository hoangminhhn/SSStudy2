import { parse, isFuture, isToday, isAfter } from 'date-fns';
import { Chapter, Session } from '@/data/courseData';

export const findNextLiveSession = (chaptersData: Chapter[]): Session | undefined => {
  const now = new Date();
  let nextLiveSession: Session | undefined = undefined;
  let earliestFutureDate: Date | undefined = undefined;

  for (const chapter of chaptersData) {
    for (const session of chapter.sessions) {
      if (session.type === 'livestream' && session.date) {
        const sessionDate = parse(session.date, 'dd/MM/yyyy', new Date());

        // Check if the session is today and has available time slots in the future
        if (isToday(sessionDate) && session.timeSlots && session.timeSlots.length > 0) {
          for (const slot of session.timeSlots) {
            // Assuming time format is "HH:mm - HH:mm"
            const [startTimeStr] = slot.time.split(' - ');
            const [hours, minutes] = startTimeStr.split(':').map(Number);
            const sessionDateTime = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate(), hours, minutes);

            if (isFuture(sessionDateTime) && slot.registrationStatus === 'register') {
              if (!earliestFutureDate || isAfter(earliestFutureDate, sessionDateTime)) {
                earliestFutureDate = sessionDateTime;
                nextLiveSession = session;
              }
            }
          }
        }
        // Check if the session is in the future
        else if (isFuture(sessionDate)) {
          if (!earliestFutureDate || isAfter(earliestFutureDate, sessionDate)) {
            earliestFutureDate = sessionDate;
            nextLiveSession = session;
          }
        }
      }
    }
  }
  return nextLiveSession;
};