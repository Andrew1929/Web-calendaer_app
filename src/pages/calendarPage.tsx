import React, { useState } from 'react';
import { AppHeader } from '../Components/appHeader';
import { CalendarCreateEventsTools } from '../Components/calendarCreateEventsTools';
import { Calendar } from '../Components/calendar';
import { useDate } from '../hooks/useDate';
import '../styles/calendarPageStyle/calendarPageStyle.css';

export const CalendarPage: React.FC = () => {
    const [mode, setMode] = useState('Week'); 
    const { daysOfWeek, month, year, handleNext, handlePrev, handleToday } = useDate({ mode });

    return (
        <div className="calendar-page">
            <header className="calendar-header">
                <AppHeader
                    month={month}
                    year={year}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onToday={handleToday}
                    onModeChange={setMode}
                />
            </header>

            <main className="calendar-main">
                <CalendarCreateEventsTools />

                <Calendar daysOfWeek={daysOfWeek} mode={mode} /> 
            </main>
        </div>
    );
};

