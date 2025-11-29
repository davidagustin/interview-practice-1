import { useState } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { TimeInput } from './components/TimeInput';
import './App.css';

function App() {
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const handleTimeSet = (seconds: number) => {
    setTimerSeconds(seconds);
  };

  return (
    <div className="app">
      <header>
        <h1>Countdown Timer</h1>
      </header>
      <main>
        <TimeInput onSetTime={handleTimeSet} />
        {timerSeconds > 0 && (
          <CountdownTimer initialTime={timerSeconds} />
        )}
      </main>
    </div>
  );
}

export default App;

