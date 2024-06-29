import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CalendarListCheckbox } from './calendarListCheckbox';
import { DeleteCalendarForm } from './deleteCalendarForm';
import { CreateCalendarForm } from './createCalendatForm';
import { CalendarEditor } from './calendarEditor'; 
import '../styles/calendarPageStyle/listOfCalendarsStyle.css';
import { useCalendarData, CalendarData } from '../hooks/useCalendarData';

export const ListOfCalendars: React.FC = () => {
    const { calendars, addCalendar, updateCalendar, deleteCalendar, getCalendarById } = useCalendarData();

    const [isDeleteCalendarFormVisible, setIsDeleteCalendarFormVisible] = useState(false);
    const [isCreateCalendarFormVisible, setIsCreateCalendarFormVisible] = useState(false);
    const [isCalendarEditorVisible, setIsCalendarEditorVisible] = useState(false);
    const [currentCalendarId, setCurrentCalendarId] = useState<string | null>(null);

    const handleOpenDeleteCalendarForm = (id: string) => {
        setCurrentCalendarId(id);
        setIsDeleteCalendarFormVisible(true);
    };

    const handleOpenCalendarEditor = (id: string) => {
        setCurrentCalendarId(id);
        setIsCalendarEditorVisible(true);
    };

    const handleCloseAll = () => {
        setIsDeleteCalendarFormVisible(false);
        setIsCreateCalendarFormVisible(false);
        setIsCalendarEditorVisible(false);
        setCurrentCalendarId(null);
    };

    const handleToggleCreateCalendarForm = () => {
        setIsCreateCalendarFormVisible(!isCreateCalendarFormVisible);
    };

    const handleSaveCalendar = (name: string, color: string) => {
        if (currentCalendarId) {
            updateCalendar(currentCalendarId, { name, color });
        } else {
            addCalendar(name, color);
        }
        handleCloseAll();
    };

    const handleDeleteCalendar = () => {
        if (currentCalendarId) {
            deleteCalendar(currentCalendarId);
        }
        handleCloseAll();
    };

    return (
        <div className="list">
            <header className="list-header">
                <p className="list-title">Мої календарі</p>

                <button className="list-header-btn" onClick={handleToggleCreateCalendarForm}>
                    <FontAwesomeIcon className='list-header-btn-icon' icon={faPlus} />
                </button>
            </header>

            <ul className="list-of-calendars">
                {calendars.map((calendar: CalendarData) => (
                    <li key={calendar.id} className='calendar-item'>
                        <CalendarListCheckbox name={calendar.name}/>

                        <div className="calendar-item-btns">
                            <button className='calendar-item-btn' onClick={() => handleOpenDeleteCalendarForm(calendar.id)}>
                                <FontAwesomeIcon className='calendar-item-btn-icon' icon={faTrash} />
                            </button>

                            <button className='calendar-item-btn' onClick={() => handleOpenCalendarEditor(calendar.id)}>
                                <FontAwesomeIcon className='calendar-item-btn-icon' icon={faPen} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {isDeleteCalendarFormVisible && currentCalendarId && (
                <DeleteCalendarForm
                    onClose={handleCloseAll}
                    onDelete={handleDeleteCalendar}
                    calendarName={calendars.find(calendar => calendar.id === currentCalendarId)?.name || ''}
                />
            )}

            {isCreateCalendarFormVisible && <CreateCalendarForm onClose={handleCloseAll} onSave={handleSaveCalendar} />}

            {isCalendarEditorVisible && currentCalendarId && (
                <CalendarEditor
                    calendar={getCalendarById(currentCalendarId)}
                    onClose={handleCloseAll}
                    onSave={handleSaveCalendar}
                />
            )}
        </div>
    );
};










