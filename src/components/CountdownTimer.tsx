import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialTime?: number;
  onTimeSet?: (seconds: number) => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialTime = 0,
  onTimeSet 
}) => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const handleStart = () => {
    if (time > 0) {
      setIsRunning(true);
      setIsComplete(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTime(initialTime);
  };

  const handleSetTime = (seconds: number) => {
    setTime(seconds);
    setIsRunning(false);
    setIsComplete(false);
    if (onTimeSet) {
      onTimeSet(seconds);
    }
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      <div className="timer-display">
        <div className="time-value">{formatTime(time)}</div>
        <div className="time-labels">
          {time >= 3600 && <span>Hours</span>}
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
        {isComplete && (
          <div className="timer-complete">Time's Up!</div>
        )}
      </div>
      <div className="timer-controls">
        <button 
          onClick={handleStart} 
          disabled={isRunning || time === 0}
        >
          Start
        </button>
        <button 
          onClick={handleStop} 
          disabled={!isRunning}
        >
          Stop
        </button>
        <button 
          onClick={handleReset}
          disabled={time === initialTime && !isComplete}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
