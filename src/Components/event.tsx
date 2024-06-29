import { CSSProperties, useState, useEffect } from 'react';
import '../styles/calendarPageStyle/eventStyle.css';
import { CalendarEventInformation } from './calendarEventInformation';
import { EditEventForm } from './editEventForm';
import { DeleteEventForm } from './deleteEventForm';
import { useEventStorage } from '../hooks/useEventStorege';

interface EventProps {
    title: string;
    startTime: string;
    endTime: string;
    calendar: string;
    mode: string;
    eventId: number;
    calendars: { name: string; color: string }[];
    calculateEventPosition: (startTime: string, endTime: string) => { top: number; marginLeft: number; height: number };
}

type ModalState = 'edit' | 'info' | 'delete' | null;

export const Event: React.FC<EventProps> = ({ title, startTime, endTime, calendar, mode, eventId, calendars, calculateEventPosition }) => {
    const [modalState, setModalState] = useState<ModalState>(null);
    const { deleteEvent } = useEventStorage();

    const [event, setEvent] = useState(() => {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        return events.find((e: { id: number }) => e.id === eventId);
    });

    useEffect(() => {
        const events = JSON.parse(localStorage.getItem('events') || '[]');
        const updatedEvent = events.find((e: { id: number }) => e.id === eventId);
        setEvent(updatedEvent);
    }, [eventId]);

    const handleEventClick = () => {
        setModalState(modalState === 'info' ? null : 'info');
    };

    const handleCloseModal = () => {
        setModalState(null);
    };

    const handleEdit = () => {
        setModalState('edit');
    };

    const handleUpdateEvent = (updatedEvent: any) => {
        setEvent(updatedEvent);
        setModalState(null);
    };

    const handleDelete = () => {
        deleteEvent(eventId);
        setModalState(null);
    };

    const openDeleteForm = () => {
        setModalState('delete');
    };

    const { top, marginLeft, height } = calculateEventPosition(startTime, endTime);

    const matchingCalendar = calendars.find(cal => cal.name === calendar);

    const eventStyle: CSSProperties = {
        position: 'absolute',
        top: `${top}rem`,
        height: `${height}rem`,
        width: mode === 'Day' ? '70rem' : '9rem',
        marginLeft: `${marginLeft}rem`,
        marginTop: '16.7rem',
        backgroundColor: matchingCalendar ? `var(--${matchingCalendar.color})` : 'var(--default-color)',
        color: 'var(--content-color)',
        borderRadius: '.5rem',
        cursor: 'pointer',
        display: 'flex',
    };

    return (
        <div className="event-content" style={eventStyle} onClick={handleEventClick}>
            <div className="left-line"></div>

            <div className="content">
                <div className="event-text">
                    <p className="title-event">{event?.title || title}</p>
                    <p className="time-event">{startTime} - {endTime}</p>
                </div>
            </div>

            {modalState === 'info' && event && (
                <CalendarEventInformation
                    onClose={handleCloseModal}
                    onEdit={handleEdit}
                    onDelete={openDeleteForm}
                    event={event}
                />
            )}

            {modalState === 'edit' && event && (
                <EditEventForm
                    onClose={handleCloseModal}
                    initialEvent={event}
                    onUpdateEvent={handleUpdateEvent}
                />
            )}

            {modalState === 'delete' && event && (
                <DeleteEventForm
                    onClose={handleCloseModal}
                    onDelete={handleDelete}
                    eventTitle={event.title}
                />
            )}
        </div>
    );
};











