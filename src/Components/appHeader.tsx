import React from 'react';
import { DropdownMenu } from '../Components/dropdownModeMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/appHeaderStyle.css';

interface AppHeaderProps {
    month: string;
    year: number;
    onNext: () => void;
    onPrev: () => void;
    onToday: () => void;
    onModeChange: (selectedMode: string) => void; 
}

export const AppHeader: React.FC<AppHeaderProps> = ({ month, year, onNext, onPrev, onToday, onModeChange }) => {
    const handleModeChange = (selectedMode: string) => {
        onModeChange(selectedMode); 
    };

    return (
        <header className="app-header">
            <div className="header-left-part">
                <div className="app-logo-and-title">
                    <div className="app-logo">
                        <div className="app-logo-first-sq"></div>
                        <div className="app-logo-second-sq"></div>
                    </div>
                    <p className="app-title">WebCalendar</p>
                </div>
                <button className="date-btn" onClick={onToday}>
                    <p className='date-btn-text'>Today</p>
                </button>
                <div className="month-arrow-btns">
                    <button className='month-arrow-btn' onClick={onPrev}>
                        <FontAwesomeIcon className='month-arrow-btn-icon' icon={faChevronLeft} />
                    </button>
                    <button className='month-arrow-btn' onClick={onNext}>
                        <FontAwesomeIcon className='month-arrow-btn-icon' icon={faChevronRight} />
                    </button>
                </div>
                <p className="month-and-year">{month} {year}</p>
            </div>
            <div className="header-right-part">
                <div className="select-view-mode">
                    <DropdownMenu onModeChange={handleModeChange} />
                </div>
                <div className="user-nickname-and-avatar">
                    <p className="user-nickname">Username</p>
                    <div className="user-avatar">
                        <span className='user-first-nickname-letter'>U</span>
                    </div>
                </div>
            </div>
        </header>
    );
};






