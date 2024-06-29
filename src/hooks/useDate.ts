import { useState } from 'react';

interface useDateHookProps {
    mode: string;
}

export const useDate = ({ mode }: useDateHookProps) => {
    const [offset, setOffset] = useState(0);

    const getWeek = (offset = 0) => {
        const now = new Date();
        now.setDate(now.getDate() + offset * 7);
        const firstDayOfWeek = now.getDate() - now.getDay();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);

        const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDayOfWeek + i);
            return {
                dayNumber: day.getDate(),
                dayW: day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
                isToday: day.toDateString() === new Date().toDateString()
            };
        });

        return {
            daysOfWeek,
            month: firstDay.toLocaleDateString('en-US', { month: 'long' }),
            year: firstDay.getFullYear()
        };
    };

    const getDay = (offset = 0) => {
        const now = new Date();
        now.setDate(now.getDate() + offset);
        const day = {
            dayNumber: now.getDate(),
            dayW: now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            isToday: now.toDateString() === new Date().toDateString()
        };

        return {
            daysOfWeek: [day],
            month: now.toLocaleDateString('en-US', { month: 'long' }),
            year: now.getFullYear()
        };
    };

    const handleNext = () => setOffset(offset + (mode === 'Week' ? 7 : 1));
    const handlePrev = () => setOffset(offset - (mode === 'Week' ? 7 : 1));
    const handleToday = () => setOffset(0);

    const { daysOfWeek, month, year } = mode === 'Week' ? getWeek(offset) : getDay(offset);

    return { daysOfWeek, month, year, handleNext, handlePrev, handleToday };
};




