import '../styles/calendarPageStyle/calendarListCheckboxStyle.css';

interface EventCheckBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const EventCheckBox: React.FC<EventCheckBoxProps> = ({ checked, onChange }) => {
    return (
        <div className="checkbox-container">
            <input
                className="checkbox"
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label className='checkbox-label'>All day</label>
        </div>
    );
}
