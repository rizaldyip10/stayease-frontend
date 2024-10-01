import { useState, useEffect } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { TenantRoomAvailabilityType } from "@/services/availabilityService";

const colorPalette = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F06292",
  "#7986CB",
  "#4DB6AC",
  "#FFD54F",
  "#81C784",
];

export const useRoomAvailabilityCalendarConfig = (
  availabilityData: TenantRoomAvailabilityType[],
  onDateSelect: (start: Date, end: Date) => void,
  onEventClick: (eventInfo: any) => void,
  calendarRef: React.RefObject<any>,
) => {
  const [headerToolbar, setHeaderToolbar] = useState({
    left: "prev today",
    center: "title",
    right: "today next",
  });

  useEffect(() => {
    const updateCalendar = () => {
      const isMobile = window.innerWidth < 768;
      setHeaderToolbar({
        left: isMobile ? "prev" : "prev today",
        center: "title",
        right: isMobile ? "next" : "today next",
      });

      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.changeView(isMobile ? "listMonth" : "dayGridMonth");
      }
    };

    updateCalendar();
    window.addEventListener("resize", updateCalendar);

    return () => {
      window.removeEventListener("resize", updateCalendar);
    };
  }, []);

  const events = availabilityData.flatMap((room, index) =>
    room.roomAvailability.map((availability) => {
      // One day added to the end date to ensure it is included in the range
      const endDate = new Date(availability.endDate);
      endDate.setDate(endDate.getDate() + 1); // Move to the next day
      endDate.setHours(0, 0, 0, 0); // Set time to 00:00

      return {
        id: availability.id.toString(),
        title: `${room.propertySummary.propertyName} - ${room.name} Room`,
        start: availability.startDate,
        end: endDate.toISOString(),
        color: !availability.isManual
          ? "#808080"
          : colorPalette[index % colorPalette.length],
        extendedProps: {
          roomId: room.id,
          isManual: availability.isManual,
        },
      };
    }),
  );

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="fc-event-main-frame">
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky">
            {eventInfo.event.extendedProps.isManual
              ? eventInfo.event.title
              : `${eventInfo.event.title} (Booked)`}
          </div>
        </div>
      </div>
    );
  };

  return {
    headerToolbar,
    events,
    renderEventContent,
    onDateSelect,
    onEventClick,
  };
};
