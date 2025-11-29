import { useState, FormEvent } from 'react';

interface TimeInputProps {
  onSetTime: (seconds: number) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onSetTime }) => {
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

  const handleNumberInput = (
    value: string,
    max: number,
    setter: (value: string) => void
  ) => {
    if (value === '' || /^\d+$/.test(value)) {
      const num = value === '' ? 0 : parseInt(value, 10);
      if (num >= 0 && num <= max) {
        setter(value);
      }
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
          onChange={(e) => handleNumberInput(e.target.value, 99, setHours)}
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          type="text"
          value={minutes}
          onChange={(e) => handleNumberInput(e.target.value, 59, setMinutes)}
          placeholder="0"
        />
      </div>
      <div className="input-group">
        <label htmlFor="seconds">Seconds</label>
        <input
          id="seconds"
          type="text"
          value={seconds}
          onChange={(e) => handleNumberInput(e.target.value, 59, setSeconds)}
          placeholder="0"
        />
      </div>
      <button type="submit">Set Time</button>
    </form>
  );
};
