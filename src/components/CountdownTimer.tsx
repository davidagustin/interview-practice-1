import { useState, useEffect, useRef } from 'react';

interface CountdownTimerProps {
<<<<<<< HEAD
  initialTime: number; // in seconds
<<<<<<< HEAD
  onTimeSet: (time: number) => void;
=======
  onTimeSet?: (time: number) => void;
>>>>>>> origin/main-merge
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  initialTime, 
  onTimeSet 
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
<<<<<<< HEAD
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

=======
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update time when initialTime changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(initialTime);
      setIsComplete(false);
    }
  }, [initialTime, isRunning]);

  // Timer countdown logic
>>>>>>> origin/main-merge
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
<<<<<<< HEAD
=======
            setIsComplete(true);
>>>>>>> origin/main-merge
            return 0;
          }
          return prev - 1;
=======
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
>>>>>>> feat/countdown-timer-own
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
<<<<<<< HEAD
        clearInterval(intervalRef.current);
=======
        window.clearInterval(intervalRef.current);
>>>>>>> feat/countdown-timer-own
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
<<<<<<< HEAD
<<<<<<< HEAD
        intervalRef.current = null;
=======
>>>>>>> origin/main-merge
      }
    };
  }, [isRunning, timeLeft]);

<<<<<<< HEAD
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
=======
  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
      setIsComplete(false);
>>>>>>> origin/main-merge
=======
      }
    };
  }, [isRunning, currentTime]);

  const handleStart = () => {
    if (currentTime > 0) {
      setIsRunning(true);
>>>>>>> feat/countdown-timer-own
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
<<<<<<< HEAD
    setTimeLeft(initialTime);
<<<<<<< HEAD
  };

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
=======
    setIsComplete(false);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
>>>>>>> origin/main-merge
=======
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
>>>>>>> feat/countdown-timer-own

  return (
    <div className="countdown-timer">
      <div className="timer-display">
<<<<<<< HEAD
        <div className="time-value">{formatTime(timeLeft)}</div>
        <div className="time-labels">
          <span>Hours</span>
=======
        <div className="time-value">{formatTime(currentTime)}</div>
        <div className="time-labels">
          {currentTime >= 3600 && <span>Hours</span>}
>>>>>>> feat/countdown-timer-own
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
<<<<<<< HEAD
<<<<<<< HEAD
      {timeLeft === 0 && (
        <div className="timer-complete">Time's Up!</div>
      )}
=======
      
      {isComplete && (
        <div className="timer-complete">Time's Up!</div>
      )}
      
>>>>>>> origin/main-merge
      <div className="timer-controls">
        <button 
          onClick={handleStart} 
          disabled={isRunning || timeLeft === 0}
        >
          Start
        </button>
        <button 
          onClick={handleStop} 
=======
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
>>>>>>> feat/countdown-timer-own
          disabled={!isRunning}
        >
          Stop
        </button>
<<<<<<< HEAD
        <button 
          onClick={handleReset}
<<<<<<< HEAD
          disabled={timeLeft === initialTime && !isRunning}
=======
          disabled={isRunning}
>>>>>>> origin/main-merge
=======
        <button
          onClick={handleReset}
          disabled={currentTime === resetTime && !isRunning}
>>>>>>> feat/countdown-timer-own
        >
          Reset
        </button>
      </div>
    </div>
  );
};

