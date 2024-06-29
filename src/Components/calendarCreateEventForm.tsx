import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faT, faClock, faCalendarDays, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { EventTitleInput } from './eventTitleInput';
import { EventTimeSelectMenu } from './eventTimeSelectMenu';
import { EventDatePicker } from './eventDatePicker';
import { useState } from 'react';
import { EventCheckBox } from './eventCheckBox';
import { EventRepeatNotification } from './eventRepeatNotification';
import { EventCalendarPicker } from './eventCalendarPicker';
import { EventDescriptionInput } from './eventDescriptionInput';
import {useEventStorage} from '../hooks/useEventStorege';
import '../styles/calendarPageStyle/calendarCreateEventFormStyle.css'

interface CalendarCreateEventFormProps {
    onClose: () => void;
}

export const CalendarCreateEventForm: React.FC<CalendarCreateEventFormProps> = ({ onClose }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [title, setTitle] = useState('your title');
    const [startTime, setStartTime] = useState('10:00 am');
    const [endTime, setEndTime] = useState('3:00 pm');
    const [description, setDescription] = useState('Your description');
    const [isAllDay, setIsAllDay] = useState(false);
    const [repeat, setRepeat] = useState('Does not repeat');
    const [calendar, setCalendar] = useState('Calendar 1');
    const { addEvent } = useEventStorage();
    

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
    };

    const handleSave = () => {
        if (selectedDate && title && startTime && endTime) {
            const event = {
                id: Date.now(),
                title,
                date: selectedDate,
                startTime,
                endTime,
                description,
                allDay: isAllDay,
                recurring: repeat,
                calendar,
            };
            addEvent(event);
            onClose();
        }
    };

    return (
        <form className="create-event-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-header">
                <p className="form-title">Create event</p>

                <button className="close-form-btn" onClick={onClose}>
                    <FontAwesomeIcon className='form-icon' icon={faXmark} />
                </button>
            </div>
            <div className="form-inputs">
                <div className="event-title-input">
                    <FontAwesomeIcon className='form-icon' icon={faT} /> 
                    
                    <EventTitleInput value={title} onChange={setTitle}/>
                </div>
                

                <div className="deadline">
                    <div className="datepicker">
                        <FontAwesomeIcon className='form-icon' icon={faClock} />
                        <div className="dropdown">
                            <label className="select-menu-label">Date</label>
                            <input
                                type="text"
                                readOnly
                                value={selectedDate || 'Select a date'}
                                onClick={toggleDatePicker}
                                className="select-date-input"
                            />
                            {isDatePickerOpen && (
                                <div className="custom-datepicker">
                                    <EventDatePicker onDateSelect={handleDateSelect}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="time-deadline">
                        <EventTimeSelectMenu value={startTime} onChange={setStartTime}/>
                        <p className='line-between'>_</p>
                        <EventTimeSelectMenu value={endTime} onChange={setEndTime}/>
                    </div>          
                </div>

                <div className="notification">
                    <EventCheckBox checked={isAllDay} onChange={setIsAllDay}/>

                    <EventRepeatNotification value={repeat} onChange={setRepeat}/>
                </div> 

                <div className="calendar-picker">
                    <FontAwesomeIcon className='form-icon' icon={faCalendarDays} />

                    <EventCalendarPicker value={calendar} onChange={setCalendar}/>
                </div>

                <div className="description-input">
                    <FontAwesomeIcon  className='form-icon' icon={faAlignLeft} />

                    <EventDescriptionInput value={description} onChange={setDescription}/>
                </div>
                 
            </div>

            <button className='save-event-btn' onClick={handleSave}>
                <p className='save-event-btn-text'>Save</p>
            </button>
        </form>
    )
}
