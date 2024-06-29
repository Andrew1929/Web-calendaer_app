import { useState, useEffect } from 'react';

interface Event {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    recurring: string;
    calendar: string;
    description: string;
}

export const useEventStorage = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const addEvent = (event: Event) => {
        const updatedEvents = [...events, event];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const editEvent = (updatedEvent: Event) => {
        const updatedEvents = events.map(event =>
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    const deleteEvent = (eventId: number) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    return {
        events,
        addEvent,
        editEvent,
        deleteEvent,
    };
};

