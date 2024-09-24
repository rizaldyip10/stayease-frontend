import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { EventContentArg } from "@fullcalendar/core";
import { TenantRoomAvailabilityType } from "@/services/availabilityService";

interface RoomAvailabilityCalendarProps {
  availabilityData: TenantRoomAvailabilityType[];
  onDateSelect: (start: Date, end: Date) => void;
  onEventClick: (eventInfo: any) => void;
}

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

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  availabilityData,
  onDateSelect,
  onEventClick,
}) => {
  const events = availabilityData.flatMap((room, index) =>
    room.roomAvailability.map((availability) => ({
      id: availability.id.toString(),
      title: `${room.propertySummary.propertyName} - ${room.name}`,
      start: availability.startDate,
      end: availability.endDate,
      color: !availability.isManual
        ? "#808080"
        : colorPalette[index % colorPalette.length],
      extendedProps: {
        roomId: room.id,
        isManual: availability.isManual,
      },
    })),
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

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev today",
        center: "title",
        right: "today next",
      }}
      events={events}
      selectable={true}
      select={({ start, end }) => onDateSelect(start, end)}
      eventClick={(info) => onEventClick(info.event)}
      height="auto"
      eventContent={renderEventContent}
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
