import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  initialTime: number; // in seconds
  onTimeSet: (time: number) => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialTime, 
  onTimeSet 
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
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
        intervalRef.current = null;
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="countdown-timer">
      <div className="timer-display">
        <div className="time-value">{formatTime(timeLeft)}</div>
        <div className="time-labels">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
      {timeLeft === 0 && (
        <div className="timer-complete">Time's Up!</div>
      )}
      <div className="timer-controls">
        <button 
          onClick={handleStart} 
          disabled={isRunning || timeLeft === 0}
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
          disabled={timeLeft === initialTime && !isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

