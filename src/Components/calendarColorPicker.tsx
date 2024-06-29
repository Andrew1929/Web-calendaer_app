import React from 'react';
import '../styles/calendarPageStyle/calendarColorPickerStyle.css';

interface CalendarColorPickerProps {
    onSelectColor: (colorIndex: number) => void;
    selectedColor: number | null;
}

interface Color {
    className: string;
}

export const CalendarColorPicker: React.FC<CalendarColorPickerProps> = ({ onSelectColor, selectedColor }) => {
    const colors: Color[] = [
        { className: 'first-color' },
        { className: 'second-color' },
        { className: 'third-color' },
        { className: 'fourth-color' },
        { className: 'fifth-color' },
        { className: 'sixth-color' },
        { className: 'seventh-color' },
        { className: 'eighth-color' },
        { className: 'ninth-color' },
        { className: 'tenth-color' },
        { className: 'eleventh-color' },
        { className: 'twelfth-color' }
    ];

    const handleColorSelect = (index: number) => {
        onSelectColor(index);
    };

    return (
        <div className="colour-picker">
            <h3 className="colour-picker-title">Colour</h3>
            <div className="colours-list">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        type="button" 
                        className={`color-selector ${color.className} ${selectedColor === index ? 'selected-color' : ''}`}
                        onClick={() => handleColorSelect(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};



