import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/deleteCalendarStyle.css';

interface DeleteCalendarFormProps {
    onClose: () => void;
    onDelete: () => void;
    calendarName: string;
}

export const DeleteCalendarForm: React.FC<DeleteCalendarFormProps> = ({ onClose, onDelete, calendarName }) => {
    return (
        <form className="delete-calendar-form">
            <header className="delete-event-form-header">
                <p className="delete-event-form-title">Delete calendar</p>

                <button className="delete-event-close-form-btn" onClick={onClose}>
                    <FontAwesomeIcon className='form-icon' icon={faXmark} />
                </button>
            </header>

            <div className="delete-event-form-content">
                <p className='delete-event-form-warning'>
                    Are you sure you want to delete {calendarName}? You'll no longer have access to this calendar and its events.
                </p>
            </div>

            <div className="delete-event-form-btns">
                <button className='delete-event-form-cancel-btn' onClick={onClose}>
                    <p className='cancel-event-form-btn-text'>Cancel</p>
                </button>
                
                <button className='delete-event-form-delete-btn' onClick={onDelete}>
                    <p className='delete-event-form-btn-text'>Delete</p>
                </button>
            </div>
        </form>
    )
}
