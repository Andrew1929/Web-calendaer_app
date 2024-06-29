import { useCalendarData } from '../hooks/useCalendarData';
import '../styles/calendarPageStyle/calendarListCheckboxStyle.css';

interface CalendarListCheckboxProps {
    name: string;
}

export const CalendarListCheckbox: React.FC<CalendarListCheckboxProps> = ({ name }) => {
    const {calendars} = useCalendarData();

    const matchingCalendar = calendars.find(calendar => calendar.name === name);

    const checkboxStyle = {
        '--checkbox-background-color': matchingCalendar ? `var(--${matchingCalendar.color})` : 'var(--default-color)',
        '--checkbox-border-color':matchingCalendar ? `var(--${matchingCalendar.color})` : 'var(--default-color)'
    } as React.CSSProperties;

    return (
        <div className="checkbox-container" style={checkboxStyle}>
            <input
                className="checkbox"
                type="checkbox"
            />
            <label className='checkbox-label'>{name}</label>
        </div>
    );
};


