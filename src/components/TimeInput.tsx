import { useState, FormEvent, ChangeEvent } from 'react';

interface TimeInputProps {
  onSetTime: (seconds: number) => void;
  disabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onSetTime, disabled = false }) => {
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');
  const [seconds, setSeconds] = useState<string>('0');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalSeconds =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(seconds, 10);
    
    if (totalSeconds > 0) {
      onSetTime(totalSeconds);
    }
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setter(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="time-input">
      <div className="input-group">
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          type="text"
          value={hours}
          onChange={(e) => handleNumberChange(e, setHours)}
          disabled={disabled}
          min="0"
          max="99"
          aria-label="Hours"
        />
      </div>
      <div className="input-group">
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          type="text"
          value={minutes}
          onChange={(e) => handleNumberChange(e, setMinutes)}
          disabled={disabled}
          min="0"
          max="59"
          aria-label="Minutes"
        />
      </div>
      <div className="input-group">
        <label htmlFor="seconds">Seconds</label>
        <input
          id="seconds"
          type="text"
          value={seconds}
          onChange={(e) => handleNumberChange(e, setSeconds)}
          disabled={disabled}
          min="0"
          max="59"
          aria-label="Seconds"
        />
      </div>
      <button type="submit" disabled={disabled}>
        Set Time
      </button>
    </form>
  );
};

