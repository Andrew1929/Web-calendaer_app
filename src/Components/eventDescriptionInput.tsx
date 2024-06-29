import { useState, FocusEvent, ChangeEvent } from 'react';
import '../styles/calendarPageStyle/eventTitleInputStyle.css';

interface EventDescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

interface TextInputState {
    descriptionDirty: boolean;
    descriptionError: string;
}

export const EventDescriptionInput: React.FC<EventDescriptionInputProps> = ({ value, onChange }) => {
    const [formState, setFormState] = useState<TextInputState>({
        descriptionDirty: false,
        descriptionError: 'Alphabets and numbers only',
    });

    const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
          ...prevState,
          descriptionDirty: true,
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        let error = '';
        if (value.length < 3) {
            error = 'Description must be at least 3 characters long.';
        } else if (value.length > 20) {
            error = 'Description must be less than 20 characters long.';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            error = 'Description can only contain letters, numbers, and underscores.';
        }
        setFormState((prevState) => ({
          ...prevState,
          descriptionError: error,
        }));
        onChange(value);
    };
    
    return (
        <div className="input">
            <label className="label-for-input">Description</label>
            <input 
                type="text" 
                className={`text-input ${formState.descriptionDirty && formState.descriptionError ? 'text-input-error' : ''}`}
                placeholder='Enter your description'
                onBlur={handleBlur}
                value={value}
                onChange={handleChange}
                name='description'
            />
            {(formState.descriptionDirty && formState.descriptionError) && <p className='error-message'>{formState.descriptionError}</p>}
        </div>
    );
};
