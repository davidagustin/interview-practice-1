import { useState, useEffect, useRef, useCallback } from 'react';

interface AgentTaskProps {
  agentId: string;
  agentName: string;
  task: string;
  initialSeconds?: number;
  onTaskComplete?: (agentId: string) => void;
  onTimeUpdate?: (agentId: string, timeRemaining: number) => void;
}

interface TimeDisplay {
  hours: number;
  minutes: number;
  seconds: number;
}

export const AgentTask: React.FC<AgentTaskProps> = ({
  agentId,
  agentName,
  task,
  initialSeconds = 0,
  onTaskComplete,
  onTimeUpdate,
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
        const newTime = prev <= 1 ? 0 : prev - 1;
        
        // Notify parent of time update
        onTimeUpdate?.(agentId, newTime);
        
        if (newTime === 0) {
          setIsRunning(false);
          clearTimerInterval();
          onTaskComplete?.(agentId);
        }
        
        return newTime;
      });
    }, 1000);
  }, [timeRemaining, agentId, onTaskComplete, onTimeUpdate, clearTimerInterval]);

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
    onTimeUpdate?.(agentId, initialSeconds);
  }, [initialSeconds, agentId, onTimeUpdate, clearTimerInterval]);

  // Update time when initialSeconds changes
  useEffect(() => {
    if (!isRunning) {
      setTimeRemaining(initialSeconds);
      onTimeUpdate?.(agentId, initialSeconds);
    }
  }, [initialSeconds, agentId, isRunning, onTimeUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimerInterval();
    };
  }, [clearTimerInterval]);

  const timeDisplay = getTimeDisplay(timeRemaining);
  const isComplete = timeRemaining === 0 && initialSeconds > 0;

  return (
    <div className="agent-task">
      <div className="agent-header">
        <h3 className="agent-name">{agentName}</h3>
        <span className="agent-id">ID: {agentId}</span>
      </div>
      
      <div className="task-info">
        <p className="task-label">Current Task:</p>
        <p className="task-description">{task || 'No task assigned'}</p>
      </div>

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
          <button onClick={start} aria-label={`Start countdown for ${agentName}`}>
            Start
          </button>
        )}
        {isRunning && (
          <button onClick={pause} aria-label={`Pause countdown for ${agentName}`}>
            Pause
          </button>
        )}
        <button 
          onClick={reset} 
          aria-label={`Reset countdown for ${agentName}`} 
          disabled={timeRemaining === initialSeconds && !isRunning}
        >
          Reset
        </button>
      </div>

      {isComplete && (
        <div className="task-complete" role="alert">
          ✓ Task Completed!
        </div>
      )}
    </div>
  );
};

