import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useCalendarData } from '../hooks/useCalendarData'; 
import '../styles/calendarPageStyle/eventCalendarPickerStyle.css';

interface EventCalendarPickerProps {
    value: string;
    onChange: (value: string) => void;
}

export const EventCalendarPicker: React.FC<EventCalendarPickerProps> = ({ value, onChange }) => {
    const { calendars } = useCalendarData();
    const selectRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const selectedRef = useRef<HTMLSpanElement>(null);

    const toggleMenu = () => {
        if (selectRef.current && menuRef.current) {
            selectRef.current.classList.toggle('select-clicked');
            menuRef.current.classList.toggle('menu-open');
        }
    };

    const handleOptionClick = (optionText: string) => {
        if (selectedRef.current && menuRef.current) {
            onChange(optionText);
            selectedRef.current.innerText = optionText;
            selectRef.current?.classList.remove('select-clicked');
            menuRef.current?.classList.remove('menu-open');
        }
    };

    return (
        <div className="dropdown-menu">
            <label className="select-menu-label">Calendar</label>

            <div className="calendar-select" onClick={toggleMenu} ref={selectRef}>
                <span className="selected" ref={selectedRef}>{value}</span>
                <div className="caret">
                    <FontAwesomeIcon className='dropdown-icon' icon={faCaretDown} />
                </div>
            </div>

            <ul className="calendar-select-menu" ref={menuRef}>
                {calendars.map(calendar => (
                    <li key={calendar.id} onClick={() => handleOptionClick(calendar.name)}>
                        {calendar.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
