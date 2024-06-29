import { useRef } from 'react';
import '../styles/calendarPageStyle/eventTimeSelectMenuStyle.css';

interface EventTimeSelectMenuProps {
    value: string;
    onChange: (value: string) => void;
}

export const EventTimeSelectMenu: React.FC<EventTimeSelectMenuProps> = ({ value, onChange }) => {
    const selectRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const toggleMenu = () => {
        if (selectRef.current && caretRef.current && menuRef.current) {
            selectRef.current.classList.toggle('select-clicked');
            caretRef.current.classList.toggle('caret-rotate');
            menuRef.current.classList.toggle('menu-open');
        }
    };

    const handleOptionClick = (optionText: string) => {
        if (selectRef.current && caretRef.current && menuRef.current) {
            onChange(optionText);
            selectRef.current.classList.remove('select-clicked');
            caretRef.current.classList.remove('caret-rotate');
            menuRef.current.classList.remove('menu-open');
        }
    };

    return (
        <div className="dropdown">
            <label className="select-menu-label">Time</label>

            <div className="select" onClick={toggleMenu} ref={selectRef}>
                <span className="selected">{value}</span>
                <div className="caret" ref={caretRef}></div>
            </div>

            <ul className="select-menu" ref={menuRef}>
                {[
                    '1:00 am', '1:15 am', '1:30 am', '1:45 am',
                    '2:00 am', '2:15 am', '2:30 am', '2:45 am',
                    '3:00 am', '3:15 am', '3:30 am', '3:45 am',
                    '4:00 am', '4:15 am', '4:30 am', '4:45 am',
                    '5:00 am', '5:15 am', '5:30 am', '5:45 am',
                    '6:00 am', '6:15 am', '6:30 am', '6:45 am',
                    '7:00 am', '7:15 am', '7:30 am', '7:45 am',
                    '8:00 am', '8:15 am', '8:30 am', '8:45 am',
                    '9:00 am', '9:15 am', '9:30 am', '9:45 am',
                    '10:00 am', '10:15 am', '10:30 am', '10:45 am',
                    '11:00 am', '11:15 am', '11:30 am', '11:45 am',
                    '12:00 pm', '12:15 pm', '12:30 pm', '12:45 pm',
                    '1:00 pm', '1:15 pm', '1:30 pm', '1:45 pm',
                    '2:00 pm', '2:15 pm', '2:30 pm', '2:45 pm',
                    '3:00 pm', '3:15 pm', '3:30 pm', '3:45 pm',
                    '4:00 pm', '4:15 pm', '4:30 pm', '4:45 pm',
                    '5:00 pm', '5:15 pm', '5:30 pm', '5:45 pm',
                    '6:00 pm', '6:15 pm', '6:30 pm', '6:45 pm',
                    '7:00 pm', '7:15 pm', '7:30 pm', '7:45 pm',
                    '8:00 pm', '8:15 pm', '8:30 pm', '8:45 pm',
                    '9:00 pm', '9:15 pm', '9:30 pm', '9:45 pm',
                    '10:00 pm', '10:15 pm', '10:30 pm', '10:45 pm',
                    '11:00 pm', '11:15 pm', '11:30 pm', '11:45 pm',
                    '12:00 am', '12:15 am', '12:30 am', '12:45 am',
                ].map((time) => (
                    <li key={time} onClick={() => handleOptionClick(time)}>{time}</li>
                ))}
            </ul>
        </div>
    );
};
