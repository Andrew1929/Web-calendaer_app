import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/calendarDatePickerStyle.css';

export const CalendarDatePicker: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [today, _] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
    }, [currentDate]);

    const changeMonth = (direction: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

        const dates = [];
        const prevMonthDays = firstDay === 0 ? 6 : firstDay - 1;
        const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        for (let i = prevMonthDays; i > 0; i--) {
            dates.push(<button className='date faded' key={`prev-${i}`}>{prevMonthDate - i + 1}</button>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const isCurrentDay = i === today.getDate() &&
                currentDate.getMonth() === today.getMonth() &&
                currentDate.getFullYear() === today.getFullYear();
            dates.push(<button className={`date ${isCurrentDay ? 'current-day' : ''}`} key={i}>{i}</button>);
        }

        const nextMonthDays = 42 - (prevMonthDays + daysInMonth);
        for (let i = 1; i <= nextMonthDays; i++) {
            dates.push(<button className='date faded' key={`next-${i}`}>{i}</button>);
        }

        return dates;
    };

    return (
        <div className="date-picker">
            <div className="data-picker-top">
                <div className="month-selector">
                    <p className='month'>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</p>

                    <div className="month-selector-btn">
                        <button className="arrow" onClick={() => changeMonth(-1)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <button className="arrow" onClick={() => changeMonth(1)}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="date-picker-calendar">
                <span className='day'>S</span>
                <span className='day'>M</span>
                <span className='day'>T</span>
                <span className='day'>W</span>
                <span className='day'>T</span>
                <span className='day'>F</span>
                <span className='day'>S</span>
                {renderCalendar()}
            </div>
        </div>
    );
};


