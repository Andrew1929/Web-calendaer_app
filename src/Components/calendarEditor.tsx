import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faT, faPalette } from '@fortawesome/free-solid-svg-icons';
import { CalendarInputTitle } from './calendarInputTitle';
import { CalendarColorPicker } from './calendarColorPicker';
import '../styles/calendarPageStyle/calendarEditorStyle.css';

interface CalendarEditorProps {
    calendar: CalendarData | undefined;
    onClose: () => void;
    onSave: (name: string, color: string) => void;
}

interface CalendarData {
    id: string;
    name: string;
    color: string;
    isSelected: boolean;
}

const COLORS = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10', 'color-11', 'color-12'];

export const CalendarEditor: React.FC<CalendarEditorProps> = ({ calendar, onClose, onSave }) => {
    const [calendarTitle, setCalendarTitle] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);

    useEffect(() => {
        if (calendar) {
            setCalendarTitle(calendar.name);
            setSelectedColorIndex(COLORS.indexOf(calendar.color));
        }
    }, [calendar]);

    const handleSave = () => {
        if (calendarTitle.trim() === '' || selectedColorIndex === null) {
            alert('Please enter a calendar title and select a color.');
            return;
        }
        onSave(calendarTitle, COLORS[selectedColorIndex]);
    };

    return (
        <div className='calendar-create-form'>
            <div className='calendar-edit-form-header'>
                <p className="calendar-edit-form-title">Edit calendar</p>

                <button className='calendar-edit-form-close-btn' onClick={onClose}>
                    <FontAwesomeIcon className='form-icon' icon={faXmark} />
                </button>
            </div>

            <div className="calendar-edit-form-content">
                <div className="calendar-title-input">
                    <FontAwesomeIcon className='box-icon' icon={faT} />

                    <CalendarInputTitle value={calendarTitle} onChange={setCalendarTitle} onBlur={() => {}} error='' />
                </div>
            </div>

            <div className="calendar-color-input">
                <FontAwesomeIcon className='box-icon' icon={faPalette} />   
                
                <CalendarColorPicker selectedColor={selectedColorIndex} onSelectColor={setSelectedColorIndex} />
            </div>

            <button type="button" className='calendar-edit-form-btn' onClick={handleSave}>
                <p className='calendar-edit-form-btn-text'>Save</p>
            </button>
        </div>
    )
}
