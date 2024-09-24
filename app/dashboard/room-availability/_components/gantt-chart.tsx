import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, NavigateAction, View } from 'react-big-calendar';
import { RoomAvailabilityType } from "@/constants/Property";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type EventType = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    resource: RoomAvailabilityType;
    available: boolean;
};

const localizer = momentLocalizer(moment);

interface RoomAvailabilitySchedulerProps {
    rooms: RoomAvailabilityType[];
}

const RoomAvailabilityScheduler: React.FC<RoomAvailabilitySchedulerProps> = ({ rooms }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showMoreEvents, setShowMoreEvents] = useState<{ date: Date; events: EventType[] } | null>(null);

    const events: EventType[] = rooms.flatMap(room =>
        room.roomAvailability.map(availability => ({
            id: `${room.id}-${availability.id}`,
            title: room.name,
            start: new Date(availability.startDate),
            end: moment(availability.endDate).add(1, 'days').toDate(),
            resource: room,
            available: availability.available
        }))
    );

    const eventStyleGetter = (event: EventType) => {
        const style: React.CSSProperties = {
            backgroundColor: event.available ? '#e6e6e6' : '#3174ad',
            color: event.available ? '#333' : '#fff',
            border: 'none',
            borderRadius: '4px'
        };
        return { style };
    };

    const CustomEvent: React.FC<{ event: EventType }> = ({ event }) => (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 5px' }}>
            <img
                src={event.resource.propertySummary.imageUrl}
                alt={event.resource.name}
                style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '5px' }}
            />
            <span>{event.resource.name}</span>
        </div>
    );

    const handleNavigate = (action: NavigateAction, date?: Date) => {
        setCurrentDate((prevDate) => {
            switch (action) {
                case 'PREV':
                    return moment(prevDate).subtract(1, 'month').toDate();
                case 'NEXT':
                    return moment(prevDate).add(1, 'month').toDate();
                case 'TODAY':
                    return new Date();
                case 'DATE':
                    return date || prevDate;
                default:
                    return prevDate;
            }
        });
    };

    const handleShowMore = useCallback((events: EventType[], date: Date) => {
        setShowMoreEvents({ date, events });
    }, []);

    const MoreEventsOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
        if (!showMoreEvents) return null;

        return (
            <div
                className="fixed top-1/2 left-1/2 flex flex-col gap-2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md z-[1000] shadow-[0 4px 6px rgba(0, 0, 0, 0.1)]"
            >
                <h3>{moment(showMoreEvents.date).format('MMMM D, YYYY')}</h3>
                <ul className="flex flex-col gap-2">
                    {showMoreEvents.events.map((event) => (
                        <li key={event.id}>
                            <CustomEvent event={event} />
                        </li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        );
    };

    return (
        <div style={{ height: '500px' }}>
            <Calendar<EventType, RoomAvailabilityType>
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                onNavigate={(newDate, view, action) => handleNavigate(action)}
                defaultView="month"
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CustomEvent as any
                }}
                onShowMore={handleShowMore}
            />
            <MoreEventsOverlay onClose={() => setShowMoreEvents(null)} />
        </div>
    );
};

export default RoomAvailabilityScheduler;