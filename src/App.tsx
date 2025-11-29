import { useState } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { TimeInput } from './components/TimeInput';
import './App.css';

function App() {
  const [initialTime, setInitialTime] = useState<number>(0);
  const [key, setKey] = useState<number>(0);

  const handleSetTime = (seconds: number) => {
    setInitialTime(seconds);
    // Force re-render of CountdownTimer with new initial time
    setKey((prev) => prev + 1);
  };

  const handleComplete = () => {
    console.log('Countdown completed!');
  };

  return (
    <div className="app">
      <header>
        <h1>Countdown Timer</h1>
      </header>
      <main>
        <TimeInput onSetTime={handleSetTime} disabled={false} />
        <CountdownTimer
          key={key}
          initialSeconds={initialTime}
          onComplete={handleComplete}
        />
      </main>
    </div>
  );
}

export default App;

