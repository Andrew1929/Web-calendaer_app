import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faT, faPalette } from '@fortawesome/free-solid-svg-icons';
import { CalendarInputTitle } from './calendarInputTitle';
import { CalendarColorPicker } from './calendarColorPicker';
import '../styles/calendarPageStyle/createClendarFormStyle.css';

interface CreateCalendarFormProps {
    onClose: () => void;
    onSave: (name: string, color: string) => void;
}

export const CreateCalendarForm: React.FC<CreateCalendarFormProps> = ({ onClose, onSave }) => {
    const [calendarTitle, setCalendarTitle] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);

    const handleSave = () => {
        if (calendarTitle.trim() === '' || selectedColorIndex === null) {
            alert('Please enter a calendar title and select a color.');
            return;
        }

        const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6', 'color-7', 'color-8', 'color-9', 'color-10', 'color-11', 'color-12'];
        onSave(calendarTitle, colors[selectedColorIndex]);
        onClose(); 
    };

    const handleColorSelect = (index: number) => {
        setSelectedColorIndex(index);
    };

    return (
        <form className="calendar-create-form">
            <header className="calendar-edit-form-header">
                <p className="calendar-edit-form-title">Create calendar</p>

                <button className="calendar-edit-form-close-btn" onClick={onClose}>
                    <FontAwesomeIcon className='form-icon' icon={faXmark} />
                </button>
            </header>

            <div className="calendar-edit-form-content">
                <div className="calendar-title-input">
                    <FontAwesomeIcon className='box-icon' icon={faT} />
                    <CalendarInputTitle
                        value={calendarTitle}
                        onChange={(value) => setCalendarTitle(value)}
                        onBlur={() => {}}
                        error=''
                    />
                </div>

                <div className="calendar-color-input">
                    <FontAwesomeIcon className='calendar-color-input-icon' icon={faPalette} />
                    <CalendarColorPicker
                        onSelectColor={handleColorSelect}
                        selectedColor={selectedColorIndex}
                    />
                </div>
            </div>

            <button type="button" className='calendar-edit-form-btn' onClick={handleSave}>
                <p className='calendar-edit-form-btn-text'>Save</p>
            </button>
        </form>
    );
};

