import { useState, useEffect, useRef, useCallback } from 'react';

interface CountdownTimerProps {
  initialSeconds?: number;
  onComplete?: () => void;
}

interface TimeDisplay {
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds = 0,
  onComplete,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  // Calculate time display values
  const getTimeDisplay = useCallback((totalSeconds: number): TimeDisplay => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  }, []);

  // Format time for display
  const formatTime = useCallback((time: TimeDisplay): string => {
    const formatNumber = (num: number): string => num.toString().padStart(2, '0');
    return `${formatNumber(time.hours)}:${formatNumber(time.minutes)}:${formatNumber(time.seconds)}`;
  }, []);

  // Cleanup interval on unmount or when stopping
  const clearTimerInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start the countdown
  const start = useCallback(() => {
    if (timeRemaining <= 0) return;
    
    setIsRunning(true);
    clearTimerInterval();

    intervalRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          clearTimerInterval();
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeRemaining, onComplete, clearTimerInterval]);

  // Pause the countdown
  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimerInterval();
  }, [clearTimerInterval]);

  // Reset the countdown
  const reset = useCallback(() => {
    setIsRunning(false);
    clearTimerInterval();
    setTimeRemaining(initialSeconds);
  }, [initialSeconds, clearTimerInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const timeDisplay = getTimeDisplay(timeRemaining);
  const isComplete = timeRemaining === 0;

  return (
    <div className="countdown-timer">
      <div className="timer-display">
        <div className="time-value" aria-live="polite" aria-atomic="true">
          {formatTime(timeDisplay)}
        </div>
        <div className="time-labels">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>

      <div className="timer-controls">
        {!isRunning && !isComplete && (
          <button onClick={start} aria-label="Start countdown">
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={pause} aria-label="Pause countdown">
            Pause
          </button>
        )}
        <button onClick={reset} aria-label="Reset countdown" disabled={timeRemaining === initialSeconds && !isRunning}>
          Reset
        </button>
      </div>

      {isComplete && (
        <div className="timer-complete" role="alert">
          Time's up!
        </div>
      )}
    </div>
  );
};

