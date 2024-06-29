import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../styles/calendarPageStyle/deleteEventFormStyle.css';

interface DeleteEventFormProps {
    onClose: () => void;
    onDelete: () => void;
    eventTitle: string;
}

export const DeleteEventForm: React.FC<DeleteEventFormProps> = ({ onClose, onDelete, eventTitle }) => {
    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        onDelete();
    };

    return (
        <form className="delete-event-form">
            <header className="delete-event-form-header">
                <p className="delete-event-form-title">Delete event</p>
                <button className="delete-event-close-form-btn" onClick={onClose}>
                    <FontAwesomeIcon className='form-icon' icon={faXmark} />
                </button>
            </header>
            <div className="delete-event-form-content">
                <p className='delete-event-form-warning'>Are you sure you want to delete "{eventTitle}"? You'll no longer have access to it.</p>
            </div>
            <div className="delete-event-form-btns">
                <button className='delete-event-form-cancel-btn' onClick={onClose}>
                    <p className='cancel-event-form-btn-text'>Cancel</p>
                </button>
                <button className='delete-event-form-delete-btn' onClick={handleDeleteClick}>
                    <p className='delete-event-form-btn-text'>Delete</p>
                </button>
            </div>
        </form>
    );
};



