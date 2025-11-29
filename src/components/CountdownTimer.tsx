import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
  time: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ time }) => {
  const [currentTime, setCurrentTime] = useState<number>(time);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [resetTime, setResetTime] = useState<number>(time);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setCurrentTime(time);
    setResetTime(time);
    setIsRunning(false);
  }, [time]);

  useEffect(() => {
    if (isRunning && currentTime > 0) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentTime]);

  const handleStart = () => {
    if (currentTime > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentTime(resetTime);
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      <div className="timer-display">
        <div className="time-value">{formatTime(currentTime)}</div>
        <div className="time-labels">
          {currentTime >= 3600 && <span>Hours</span>}
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
      {currentTime === 0 && isRunning === false && resetTime > 0 && (
        <div className="timer-complete">Time's up!</div>
      )}
      <div className="timer-controls">
        <button
          onClick={handleStart}
          disabled={isRunning || currentTime === 0}
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
          disabled={currentTime === resetTime && !isRunning}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

