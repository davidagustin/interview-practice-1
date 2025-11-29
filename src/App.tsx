import { useState } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { TimeInput } from './components/TimeInput';
import './App.css';

function App() {
<<<<<<< HEAD
<<<<<<< HEAD
  const [timerTime, setTimerTime] = useState<number>(0);

  const handleTimeSet = (seconds: number) => {
    setTimerTime(seconds);
=======
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  const handleTimeSet = (seconds: number) => {
    setTimerSeconds(seconds);
>>>>>>> origin/main-merge
=======
  const [timerTime, setTimerTime] = useState<number>(0);

  const handleSetTime = (seconds: number) => {
    setTimerTime(seconds);
>>>>>>> feat/countdown-timer-own
  };

  return (
    <div className="app">
      <header>
        <h1>Countdown Timer</h1>
      </header>
      <main>
<<<<<<< HEAD
        <TimeInput onSetTime={handleTimeSet} />
<<<<<<< HEAD
        {timerTime > 0 && (
          <CountdownTimer 
            initialTime={timerTime} 
            onTimeSet={handleTimeSet}
          />
=======
        {timerSeconds > 0 && (
          <CountdownTimer initialTime={timerSeconds} />
>>>>>>> origin/main-merge
        )}
=======
        <TimeInput onSetTime={handleSetTime} />
        <CountdownTimer time={timerTime} />
>>>>>>> feat/countdown-timer-own
      </main>
    </div>
  );
}

export default App;

