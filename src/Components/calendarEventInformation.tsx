import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faX, faT, faClock, faCalendarDays, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/calendarEventInformationStyle.css';

interface CalendarEventInformationProps {
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void; 
    event: {
        id: number;
        title: string;
        startTime: string;
        endTime: string;
        allDay: boolean;
        recurring: string;
        calendar: string;
        description: string;
    };
}

export const CalendarEventInformation: React.FC<CalendarEventInformationProps> = ({ onClose, onEdit, onDelete, event }) => {
    return (
        <>
            <div className="event-info">
                <header className="event-info-box-header">
                    <p className="box-title">Event information</p>

                    <div className="box-btns">
                        <button className='box-btn' type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                            <FontAwesomeIcon className='box-btn-icon' icon={faPen} />
                        </button>

                        <button className='box-btn' type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
                            <FontAwesomeIcon className='box-btn-icon' icon={faTrash} />
                        </button>

                        <button className='box-btn' type="button" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                            <FontAwesomeIcon className='box-btn-icon' icon={faX} />
                        </button>
                    </div>
                </header>

                <div className="event-info-box-content">
                    <div className="event-title-info">
                        <FontAwesomeIcon className='box-icon' icon={faT} />
                        <p className='title-info'>{event.title}</p>
                    </div>

                    <div className="event-time-info">
                        <FontAwesomeIcon className='box-icon' icon={faClock} />
                        <div className="time-info">
                            <p className='top-part-info'>{`${event.startTime} - ${event.endTime}`}</p>
                            <p className='bottom-part-info'>{event.allDay ? 'All day' : `Weekly on ${event.recurring}`}</p>
                        </div>
                    </div>

                    <div className="event-calendar-info">
                        <FontAwesomeIcon className='box-icon' icon={faCalendarDays} />
                        <p className='calendar-info'>{`${event.calendar}`}</p>
                    </div>

                    <div className="event-description">
                        <FontAwesomeIcon className='box-icon' icon={faAlignLeft} />
                        <p className='description-text'>{event.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};









