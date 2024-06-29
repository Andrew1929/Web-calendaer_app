import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/eventRepeatNotificationStyle.css';

interface EventRepeatNotificationProps {
    value: string;
    onChange: (value: string) => void;
}

export const EventRepeatNotification: React.FC<EventRepeatNotificationProps> = ({ value, onChange }) => {
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
        onChange(optionText);
        if (selectedRef.current && menuRef.current) {
            selectedRef.current.innerText = optionText;
            selectRef.current?.classList.remove('select-clicked');
            menuRef.current?.classList.remove('menu-open');
        }
    };

    return (
        <div className="dropdown-menu">
            <div className="notification-select" onClick={toggleMenu} ref={selectRef}>
                <span className="selected" ref={selectedRef}>{value}</span>
                <div className="caret">
                    <FontAwesomeIcon className='dropdown-icon' icon={faCaretDown} />
                </div>
            </div>
            <ul className="notification-select-menu" ref={menuRef}>
                <li onClick={() => handleOptionClick('Does not repeat')}>Does not repeat</li>
                <li onClick={() => handleOptionClick('Daily')}>Daily</li>
                <li onClick={() => handleOptionClick('Weekly on Thursday')}>Weekly on Thursday</li>
                <li onClick={() => handleOptionClick('Monthly')}>Monthly</li>
                <li onClick={() => handleOptionClick('Annually on November 2')}>Annually on November 2</li>
            </ul>
        </div>
    );
}
