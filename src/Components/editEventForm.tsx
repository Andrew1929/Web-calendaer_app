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
import { useEventStorage } from '../hooks/useEventStorege';
import '../styles/calendarPageStyle/editEventFormStyle.css'

interface EditEventFormProps {
    onClose: () => void;
    initialEvent: Event;
    onUpdateEvent: (event: Event) => void;
}

interface Event {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    recurring: string;
    calendar: string;
    description: string;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({ onClose, initialEvent, onUpdateEvent }) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(initialEvent.date);
    const [title, setTitle] = useState(initialEvent.title);
    const [startTime, setStartTime] = useState(initialEvent.startTime);
    const [endTime, setEndTime] = useState(initialEvent.endTime);
    const [description, setDescription] = useState(initialEvent.description);
    const [isAllDay, setIsAllDay] = useState(initialEvent.allDay);
    const [repeat, setRepeat] = useState(initialEvent.recurring);
    const [calendar, setCalendar] = useState(initialEvent.calendar);
    const { editEvent } = useEventStorage();

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setIsDatePickerOpen(false);
    };

    const handleSave = () => {
        if (selectedDate && title && startTime && endTime) {
            const updatedEvent = {
                ...initialEvent,
                title,
                date: selectedDate,
                startTime,
                endTime,
                description,
                allDay: isAllDay,
                recurring: repeat,
                calendar,
            };
            editEvent(updatedEvent);
            onUpdateEvent(updatedEvent);
            onClose();
        }
    };

    return (
        <form className="edit-event-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-header">
                <p className="form-title">Edit event</p>

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

