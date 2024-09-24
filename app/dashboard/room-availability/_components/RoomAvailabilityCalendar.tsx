import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { TenantRoomAvailabilityType } from "@/services/availabilityService";
import { useRoomAvailabilityCalendarConfig } from "@/hooks/reports/useRoomAvailabilityCalendarConfig";

interface RoomAvailabilityCalendarProps {
  availabilityData: TenantRoomAvailabilityType[];
  onDateSelect: (start: Date, end: Date) => void;
  onEventClick: (eventInfo: any) => void;
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  availabilityData,
  onDateSelect,
  onEventClick,
}) => {
  const { headerToolbar, events, renderEventContent } =
    useRoomAvailabilityCalendarConfig(
      availabilityData,
      onDateSelect,
      onEventClick,
    );

  const isDateBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of the day
    return date < today;
  };

  const selectAllow = (selectInfo: any) => {
    return !isDateBeforeToday(selectInfo.start);
  };

  const dayCellClassNames = (renderProps: { date: Date }) => {
    return isDateBeforeToday(renderProps.date)
      ? ["bg-gray-100", "text-gray-500", "cursor-not-allowed", "font-light"]
      : [];
  };

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
        multiMonthPlugin,
      ]}
      initialView="dayGridMonth"
      headerToolbar={headerToolbar}
      events={events}
      weekends={true}
      selectable={true}
      selectAllow={selectAllow}
      select={({ start, end }) => onDateSelect(start, end)}
      eventClick={(info) => onEventClick(info.event)}
      height="auto"
      eventContent={renderEventContent}
      dayCellClassNames={dayCellClassNames}
      views={{
        dayGridMonth: {
          eventLimit: 3,
        },
      }}
      windowResize={({ view }) => {
        const calendarApi = view.calendar;
        if (window.innerWidth < 768) {
          calendarApi.changeView("listMonth");
        } else {
          calendarApi.changeView("dayGridMonth");
        }
      }}
    />
  );
};

export default RoomAvailabilityCalendar;
