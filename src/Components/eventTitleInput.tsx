import { useState, FocusEvent, ChangeEvent } from 'react';
import '../styles/calendarPageStyle/eventTitleInputStyle.css';

interface EventTitleInputProps {
    value: string;
    onChange: (value: string) => void;
}

interface TextInputState {
    eventTitleDirty: boolean;
    eventTitleError: string;
}

export const EventTitleInput: React.FC<EventTitleInputProps> = ({ value, onChange }) => {
    const [formState, setFormState] = useState<TextInputState>({
        eventTitleDirty: false,
        eventTitleError: 'Alphabets and numbers only',
    });

    const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
          ...prevState,
          eventTitleDirty: true,
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let error = '';
        if (value.length < 3) {
            error = 'Event Title must be at least 3 characters long.';
        } else if (value.length > 20) {
            error = 'Event Title must be less than 20 characters long.';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            error = 'Event Title can only contain letters, numbers, and underscores.';
        }
        setFormState((prevState) => ({
          ...prevState,
          eventTitleError: error,
        }));
        onChange(value);
    };
    
    return (
        <div className="input">
            <label className="label-for-input">Title</label>
            <input 
                type="text" 
                className={`text-input ${formState.eventTitleDirty && formState.eventTitleError ? 'text-input-error' : ''}`}
                placeholder='Enter title'
                onBlur={handleBlur}
                value={value}
                onChange={handleChange}
                name='eventTitle'
            />
            {(formState.eventTitleDirty && formState.eventTitleError) && <p className='error-message'>{formState.eventTitleError}</p>}
        </div>
    );
};
