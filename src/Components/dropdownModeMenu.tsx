import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/dropdownModeMenuStyle.css';

interface DropdownMenuProps {
    onModeChange: (mode: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ onModeChange }) => {
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
            selectedRef.current.innerText = optionText;
            selectRef.current?.classList.remove('select-clicked');
            menuRef.current?.classList.remove('menu-open');
            onModeChange(optionText); 
        }
    };

    return (
        <div className="dropdown-menu">
            <div className="dropdown-select" onClick={toggleMenu} ref={selectRef}>
                <span className="selected" ref={selectedRef}>Week</span>
                <div className="caret">
                    <FontAwesomeIcon className='dropdown-icon' icon={faCaretDown} />
                </div>
            </div>

            <ul className="dropdown-select-menu" ref={menuRef}>
                <li onClick={() => handleOptionClick('Day')}>Day</li>
                <li onClick={() => handleOptionClick('Week')}>Week</li>
            </ul>
        </div>
    )
};
