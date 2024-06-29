import React from 'react';
import { useEventStorage } from '../hooks/useEventStorege';
import { useCalendarData } from '../hooks/useCalendarData';
import { Event } from './event';
import '../styles/calendarPageStyle/calendarStyle.css';

interface CalendarProps {
    daysOfWeek: { dayNumber: number; dayW: string; isToday: boolean }[];
    mode: string;
}

export const Calendar: React.FC<CalendarProps> = ({ daysOfWeek, mode }) => {
    const { calendars } = useCalendarData();

    const hours = [
        '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am',
        '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm',
        '8 pm', '9 pm', '10 pm', '11 pm', '12 am'
    ];

    const {events } = useEventStorage();

    const calculateEventPosition = (startTime: string, endTime: string): { top: number; marginLeft: number; height: number } => {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);

        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);

        const startTotalMinutes = startHour * 60 + startMinute;

        const topPosition = ((startTotalMinutes / 60) * 6) - 12;

        const eventDurationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);

        let eventHeight = (eventDurationMinutes / 60) * 6;

        const marginLeft = 0;

        return { top: topPosition, marginLeft, height: eventHeight };
    };

    return (
        <div className="calendar">
            <div className="calendar-top-part">
                <div className="odd"></div>
                <div className={`day-week ${mode === 'Day' ? 'day-week-day-mode' : ''}`}>
                    {daysOfWeek.map((day, index) => (
                        <div className={`day-info ${mode === 'Day' && day.isToday ? 'today-info' : 'today'}`} key={index}>
                            <p className="day-number">{day.dayNumber}</p>
                            <p className="dayW">{day.dayW}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="calendar-content">
                <div className="hours">
                    {hours.map((hour, index) => (
                        <p className="hour" key={index}>{hour}</p>
                    ))}
                </div>

                <div className={`events-list ${mode === 'Day' ? 'day-events-list' : ''}`}>
                    {daysOfWeek.map((day, dayIndex) => (
                        <div className="events-day" key={dayIndex}>
                            {hours.map((hourIndex) => (
                                <div className={`event ${mode === 'Day' ? 'day-mode-event' : ''}`} key={`${dayIndex}-${hourIndex}`}>
                                    {events
                                        .filter(event => new Date(event.date).getDate() === day.dayNumber)
                                        .map(event => (
                                            <Event
                                                key={event.id}
                                                title={event.title}
                                                startTime={event.startTime}
                                                endTime={event.endTime}
                                                calendar={event.calendar}
                                                mode={mode}
                                                eventId={event.id}
                                                calendars={calendars}
                                                calculateEventPosition={calculateEventPosition}
                                            />
                                        ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


















