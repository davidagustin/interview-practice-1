import { AgentTaskManager } from './components/AgentTaskManager';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Multi-Agent Countdown Timer</h1>
      </header>
      <main>
        <AgentTaskManager />
      </main>
    </div>
  );
}

export default App;

