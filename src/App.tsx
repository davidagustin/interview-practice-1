import { useState } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { TimeInput } from './components/TimeInput';
import './App.css';

function App() {
  const [timerTime, setTimerTime] = useState<number>(0);

  const handleTimeSet = (seconds: number) => {
    setTimerTime(seconds);
  };

  return (
    <div className="app">
      <header>
        <h1>Countdown Timer</h1>
      </header>
      <main>
        <TimeInput onSetTime={handleTimeSet} />
        {timerTime > 0 && (
          <CountdownTimer 
            initialTime={timerTime} 
            onTimeSet={handleTimeSet}
          />
        )}
      </main>
    </div>
  );
}

export default App;

