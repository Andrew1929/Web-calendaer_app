import { CalendarDatePicker } from "./calendarDatePicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListOfCalendars } from "./listOfCalendars";
import { useState } from "react";
import { CalendarCreateEventForm } from './calendarCreateEventForm';
import '../styles/calendarPageStyle/calendarCreateEventsToolsStyle.css'

export const CalendarCreateEventsTools :React.FC = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleCreateButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="calendar-create-events-tools">
                <button className="create-event-btn"  onClick={handleCreateButtonClick}>
                    <p className="create-event-btn-text">
                        <FontAwesomeIcon icon={faPlus} /> Create
                    </p>
                </button>

                {isFormVisible && <CalendarCreateEventForm onClose={handleCloseForm} />}

                <CalendarDatePicker/>

                <ListOfCalendars/>
        </div>
        
    )
} 