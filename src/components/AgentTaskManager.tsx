import { useState, useCallback } from 'react';
import { AgentTask } from './AgentTask';

interface Task {
  id: string;
  name: string;
  duration: number; // in seconds
}

interface Agent {
  id: string;
  name: string;
  taskId: string | null;
}

const AVAILABLE_TASKS: Task[] = [
  { id: 'task-1', name: 'Data Analysis', duration: 300 }, // 5 minutes
  { id: 'task-2', name: 'Code Review', duration: 600 }, // 10 minutes
  { id: 'task-3', name: 'Testing', duration: 450 }, // 7.5 minutes
  { id: 'task-4', name: 'Documentation', duration: 900 }, // 15 minutes
  { id: 'task-5', name: 'Bug Fixing', duration: 1200 }, // 20 minutes
  { id: 'task-6', name: 'Feature Development', duration: 1800 }, // 30 minutes
];

export const AgentTaskManager: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'agent-1', name: 'Agent Alpha', taskId: null },
    { id: 'agent-2', name: 'Agent Beta', taskId: null },
    { id: 'agent-3', name: 'Agent Gamma', taskId: null },
  ]);

  const [assignedTaskIds, setAssignedTaskIds] = useState<Set<string>>(new Set());

  const assignTask = useCallback((agentId: string, taskId: string) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === agentId ? { ...agent, taskId } : agent
      )
    );
    setAssignedTaskIds((prev) => new Set(prev).add(taskId));
  }, []);

  const unassignTask = useCallback((agentId: string) => {
    setAgents((prevAgents) => {
      const agent = prevAgents.find((a) => a.id === agentId);
      if (agent?.taskId) {
        setAssignedTaskIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(agent.taskId!);
          return newSet;
        });
      }
      return prevAgents.map((agent) =>
        agent.id === agentId ? { ...agent, taskId: null } : agent
      );
    });
  }, []);

  const handleTaskComplete = useCallback((agentId: string, taskName: string) => {
    console.log(`${agentId} completed task: ${taskName}`);
    // Optionally unassign task after completion
    // unassignTask(agentId);
  }, []);

  const getAvailableTasks = useCallback(() => {
    return AVAILABLE_TASKS.filter((task) => !assignedTaskIds.has(task.id));
  }, [assignedTaskIds]);

  const getTaskForAgent = useCallback(
    (taskId: string | null) => {
      if (!taskId) return null;
      return AVAILABLE_TASKS.find((task) => task.id === taskId) || null;
    },
    []
  );

  return (
    <div className="agent-task-manager">
      <div className="manager-header">
        <h2>Multi-Agent Task Management</h2>
        <p className="subtitle">Each agent works on a different task</p>
      </div>

      <div className="agents-container">
        {agents.map((agent) => {
          const task = getTaskForAgent(agent.taskId);
          const availableTasks = getAvailableTasks();

          return (
            <div key={agent.id} className="agent-container">
              <div className="agent-assignment">
                <label htmlFor={`task-select-${agent.id}`}>
                  Assign Task to {agent.name}:
                </label>
                <select
                  id={`task-select-${agent.id}`}
                  value={agent.taskId || ''}
                  onChange={(e) => {
                    const newTaskId = e.target.value;
                    if (newTaskId) {
                      // Unassign previous task if exists
                      if (agent.taskId) {
                        unassignTask(agent.id);
                      }
                      assignTask(agent.id, newTaskId);
                    } else {
                      unassignTask(agent.id);
                    }
                  }}
                >
                  <option value="">-- Select Task --</option>
                  {task && (
                    <option value={task.id} key={task.id}>
                      {task.name} (Currently Assigned)
                    </option>
                  )}
                  {availableTasks.map((availableTask) => (
                    <option value={availableTask.id} key={availableTask.id}>
                      {availableTask.name} ({Math.floor(availableTask.duration / 60)} min)
                    </option>
                  ))}
                </select>
              </div>

              {task ? (
                <AgentTask
                  agentId={agent.id}
                  agentName={agent.name}
                  taskName={task.name}
                  initialSeconds={task.duration}
                  onTaskComplete={handleTaskComplete}
                />
              ) : (
                <div className="no-task-assigned">
                  <p>No task assigned. Select a task above to begin.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="task-status">
        <h3>Task Assignment Status</h3>
        <div className="status-grid">
          {AVAILABLE_TASKS.map((task) => {
            const isAssigned = assignedTaskIds.has(task.id);
            const assignedAgent = agents.find((agent) => agent.taskId === task.id);
            return (
              <div
                key={task.id}
                className={`status-item ${isAssigned ? 'assigned' : 'available'}`}
              >
                <span className="task-name">{task.name}</span>
                <span className="task-status">
                  {isAssigned
                    ? `✓ Assigned to ${assignedAgent?.name}`
                    : '○ Available'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

