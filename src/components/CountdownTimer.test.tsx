import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CountdownTimer } from './CountdownTimer';

describe('CountdownTimer', () => {

  it('renders with initial time formatted correctly', () => {
    render(<CountdownTimer initialTime={3665} />);

    // 3665 seconds = 1 hour, 1 minute, 5 seconds
    expect(screen.getByText('01:01:05')).toBeInTheDocument();
  });

  it('formats time correctly for hours, minutes, and seconds', () => {
    const { rerender } = render(<CountdownTimer initialTime={3600} />);
    expect(screen.getByText('01:00:00')).toBeInTheDocument();

    rerender(<CountdownTimer initialTime={60} />);
    expect(screen.getByText('00:01:00')).toBeInTheDocument();

    rerender(<CountdownTimer initialTime={1} />);
    expect(screen.getByText('00:00:01')).toBeInTheDocument();
  });

  it('formats time with proper zero padding', () => {
    render(<CountdownTimer initialTime={3661} />);

    // 3661 seconds = 1:01:01
    expect(screen.getByText('01:01:01')).toBeInTheDocument();
  });

  it('renders all control buttons', () => {
    render(<CountdownTimer initialTime={100} />);

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('start button is disabled when timer is at zero', () => {
    render(<CountdownTimer initialTime={0} />);

    const startButton = screen.getByRole('button', { name: 'Start' });
    expect(startButton).toBeDisabled();
  });

  it('stop button is disabled when timer is not running', () => {
    render(<CountdownTimer initialTime={100} />);

    const stopButton = screen.getByRole('button', { name: 'Stop' });
    expect(stopButton).toBeDisabled();
  });

  it('reset button is disabled when timer is running', () => {
    render(<CountdownTimer initialTime={100} />);

    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    const resetButton = screen.getByRole('button', { name: 'Reset' });
    expect(resetButton).toBeDisabled();
  });

  it('starts the timer when start button is clicked', () => {
    render(<CountdownTimer initialTime={10} />);

    const startButton = screen.getByRole('button', { name: 'Start' });
    const stopButton = screen.getByRole('button', { name: 'Stop' });

    // Initially stop button should be disabled
    expect(stopButton).toBeDisabled();

    fireEvent.click(startButton);

    // After clicking start, stop button should be enabled
    expect(stopButton).not.toBeDisabled();
    expect(startButton).toBeDisabled();
  });

  it('stops the timer when stop button is clicked', () => {
    render(<CountdownTimer initialTime={10} />);

    const startButton = screen.getByRole('button', { name: 'Start' });
    const stopButton = screen.getByRole('button', { name: 'Stop' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    fireEvent.click(startButton);

    // After starting, stop should be enabled and reset should be disabled
    expect(stopButton).not.toBeDisabled();
    expect(resetButton).toBeDisabled();

    fireEvent.click(stopButton);

    // After stopping, stop should be disabled and reset should be enabled
    expect(stopButton).toBeDisabled();
    expect(resetButton).not.toBeDisabled();
  });

  it('resets timer when reset button is clicked', () => {
    render(<CountdownTimer initialTime={10} />);

    const resetButton = screen.getByRole('button', { name: 'Reset' });

    // Reset button should be enabled initially
    expect(resetButton).not.toBeDisabled();

    fireEvent.click(resetButton);

    // Time should still be at initial value
    expect(screen.getByText('00:00:10')).toBeInTheDocument();
  });

  it('updates time when initialTime prop changes and timer is not running', () => {
    const { rerender } = render(<CountdownTimer initialTime={10} />);
    expect(screen.getByText('00:00:10')).toBeInTheDocument();

    rerender(<CountdownTimer initialTime={20} />);
    expect(screen.getByText('00:00:20')).toBeInTheDocument();
  });

  it('does not update time when initialTime prop changes while timer is running', () => {
    const { rerender } = render(<CountdownTimer initialTime={10} />);

    const startButton = screen.getByRole('button', { name: 'Start' });
    fireEvent.click(startButton);

    // Change initialTime prop while running
    rerender(<CountdownTimer initialTime={20} />);

    // Time should still be at 10 seconds (not reset to 20) since timer is running
    expect(screen.getByText('00:00:10')).toBeInTheDocument();
  });

  it('displays time labels correctly', () => {
    render(<CountdownTimer initialTime={100} />);

    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });
});
