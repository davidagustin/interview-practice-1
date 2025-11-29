import { useState } from 'react';
import { AgentTask } from './AgentTask';
import { TimeInput } from './TimeInput';

interface Agent {
  id: string;
  name: string;
  task: string;
  initialSeconds: number;
  currentSeconds: number;
}

export const AgentTaskManager: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'agent-1', name: 'Agent Alpha', task: 'Code Review', initialSeconds: 0, currentSeconds: 0 },
    { id: 'agent-2', name: 'Agent Beta', task: 'Testing', initialSeconds: 0, currentSeconds: 0 },
    { id: 'agent-3', name: 'Agent Gamma', task: 'Documentation', initialSeconds: 0, currentSeconds: 0 },
  ]);

  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0].id);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [newAgentName, setNewAgentName] = useState<string>('');

  const handleSetTime = (seconds: number) => {
    if (selectedAgentId) {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === selectedAgentId
            ? { ...agent, initialSeconds: seconds, currentSeconds: seconds }
            : agent
        )
      );
    }
  };

  const handleTaskComplete = (agentId: string) => {
    console.log(`Agent ${agentId} completed their task!`);
    // You can add additional logic here, like marking task as complete
  };

  const handleTimeUpdate = (agentId: string, timeRemaining: number) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, currentSeconds: timeRemaining } : agent
      )
    );
  };

  const handleUpdateTask = (agentId: string, newTask: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId ? { ...agent, task: newTask } : agent
      )
    );
  };

  const handleAddAgent = () => {
    if (newAgentName.trim()) {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name: newAgentName.trim(),
        task: 'New Task',
        initialSeconds: 0,
        currentSeconds: 0,
      };
      setAgents((prev) => [...prev, newAgent]);
      setNewAgentName('');
    }
  };

  const handleRemoveAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    if (selectedAgentId === agentId && agents.length > 1) {
      const remainingAgents = agents.filter((agent) => agent.id !== agentId);
      setSelectedAgentId(remainingAgents[0].id);
    }
  };

  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId);

  return (
    <div className="agent-task-manager">
      <div className="manager-header">
        <h2>Multi-Agent Task Manager</h2>
        <p className="subtitle">Each agent works on a different task with their own countdown timer</p>
      </div>

      <div className="agent-controls">
        <div className="agent-selector">
          <label htmlFor="agent-select">Select Agent:</label>
          <select
            id="agent-select"
            value={selectedAgentId}
            onChange={(e) => setSelectedAgentId(e.target.value)}
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} - {agent.task}
              </option>
            ))}
          </select>
        </div>

        {selectedAgent && (
          <div className="task-editor">
            <label htmlFor="task-input">Update Task:</label>
            <div className="task-input-group">
              <input
                id="task-input"
                type="text"
                value={newTaskName || selectedAgent.task}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Enter task description"
              />
              <button
                onClick={() => {
                  handleUpdateTask(selectedAgentId, newTaskName || selectedAgent.task);
                  setNewTaskName('');
                }}
              >
                Update Task
              </button>
            </div>
          </div>
        )}

        <div className="time-setter">
          <p>Set countdown time for selected agent:</p>
          <TimeInput onSetTime={handleSetTime} disabled={!selectedAgentId} />
        </div>

        <div className="add-agent">
          <label htmlFor="new-agent-name">Add New Agent:</label>
          <div className="add-agent-group">
            <input
              id="new-agent-name"
              type="text"
              value={newAgentName}
              onChange={(e) => setNewAgentName(e.target.value)}
              placeholder="Agent name"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddAgent();
                }
              }}
            />
            <button onClick={handleAddAgent}>Add Agent</button>
          </div>
        </div>
      </div>

      <div className="agents-grid">
        {agents.map((agent) => (
          <AgentTask
            key={agent.id}
            agentId={agent.id}
            agentName={agent.name}
            task={agent.task}
            initialSeconds={agent.initialSeconds}
            onTaskComplete={handleTaskComplete}
            onTimeUpdate={handleTimeUpdate}
          />
        ))}
      </div>

      {agents.length > 0 && (
        <div className="agent-actions">
          {agents.map((agent) => (
            <div key={agent.id} className="agent-action-item">
              <span>{agent.name}</span>
              <button
                onClick={() => handleRemoveAgent(agent.id)}
                className="remove-agent-btn"
                aria-label={`Remove ${agent.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

