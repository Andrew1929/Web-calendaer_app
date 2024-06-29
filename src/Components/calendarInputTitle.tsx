import React, { ChangeEvent } from 'react';
import '../styles/calendarPageStyle/calendarInputTitleStyle.css';

interface CalendarInputTitleProps {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    error: string;
}

export const CalendarInputTitle: React.FC<CalendarInputTitleProps> = ({ value, onChange, onBlur, error }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="input">
            <label className="label-for-input">Title</label>

            <input 
                type="text" 
                className={`title-input ${error ? 'text-input-error' : ''}`}
                placeholder='Enter title'
                onBlur={onBlur}
                value={value}
                onChange={handleInputChange}
                name='title'
            />

            {error && <p className='error-message'>{error}</p>}
        </div>
    );
};
