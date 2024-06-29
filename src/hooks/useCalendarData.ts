import { useState, useEffect } from 'react';

export interface CalendarData {
    id: string;
    name: string;
    color: string;
    isSelected: boolean;
}

const LOCAL_STORAGE_KEY = 'calendars';

export const useCalendarData = () => {
    const [calendars, setCalendars] = useState<CalendarData[]>([]);

    useEffect(() => {
        const storedCalendars = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedCalendars) {
            setCalendars(JSON.parse(storedCalendars));
        }
    }, []);    

    useEffect(() => {
        if (calendars.length > 0) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calendars));
        }
    }, [calendars]);    

    const addCalendar = (name: string, color: string) => {
        const newCalendar: CalendarData = {
            id: Date.now().toString(),
            name,
            color,
            isSelected: false,
        };
        setCalendars(prevCalendars => [...prevCalendars, newCalendar]);
    };

    const toggleCalendarSelection = (id: string) => {
        const updatedCalendars = calendars.map(calendar =>
            calendar.id === id ? { ...calendar, isSelected: !calendar.isSelected } : calendar
        );
        setCalendars(updatedCalendars);
    };

    const getCalendarById = (id: string): CalendarData | undefined => {
        return calendars.find(calendar => calendar.id === id);
    };

    const updateCalendar = (id: string, updatedCalendar: Partial<CalendarData>) => {
        const updatedCalendars = calendars.map(calendar =>
            calendar.id === id ? { ...calendar, ...updatedCalendar } : calendar
        );
        setCalendars(updatedCalendars);
    };

    const deleteCalendar = (id: string) => {
        const updatedCalendars = calendars.filter(calendar => calendar.id !== id);
        setCalendars(updatedCalendars);
    };    

    return {
        calendars,
        addCalendar,
        toggleCalendarSelection,
        getCalendarById,
        updateCalendar,
        deleteCalendar,
    };
};


  







