import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Countdown Timer' })).toBeInTheDocument();
  });

  it('renders the TimeInput component', () => {
    render(<App />);

    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set Time' })).toBeInTheDocument();
  });

  it('does not render CountdownTimer initially', () => {
    render(<App />);

    // Timer controls should not be visible
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
  });

  it('renders CountdownTimer after setting a valid time', () => {
    render(<App />);

    const minutesInput = screen.getByLabelText('Minutes');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(minutesInput, { target: { value: '5' } });
    fireEvent.click(submitButton);

    // Timer should now be visible
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();

    // Timer should show 5 minutes (00:05:00)
    expect(screen.getByText('00:05:00')).toBeInTheDocument();
  });

  it('updates CountdownTimer with correct time from TimeInput', () => {
    render(<App />);

    const hoursInput = screen.getByLabelText('Hours');
    const minutesInput = screen.getByLabelText('Minutes');
    const secondsInput = screen.getByLabelText('Seconds');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(minutesInput, { target: { value: '30' } });
    fireEvent.change(secondsInput, { target: { value: '45' } });
    fireEvent.click(submitButton);

    // Timer should show 1:30:45
    expect(screen.getByText('01:30:45')).toBeInTheDocument();
  });

  it('can set different times sequentially', () => {
    render(<App />);

    const minutesInput = screen.getByLabelText('Minutes');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    // Set 5 minutes
    fireEvent.change(minutesInput, { target: { value: '5' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('00:05:00')).toBeInTheDocument();

    // Set 10 minutes
    fireEvent.change(minutesInput, { target: { value: '10' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('00:10:00')).toBeInTheDocument();
  });

  it('maintains state management between TimeInput and CountdownTimer', () => {
    render(<App />);

    const secondsInput = screen.getByLabelText('Seconds');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    // Set initial time
    fireEvent.change(secondsInput, { target: { value: '30' } });
    fireEvent.click(submitButton);

    // Verify timer is displayed
    expect(screen.getByText('00:00:30')).toBeInTheDocument();

    // Update to a new time
    fireEvent.change(secondsInput, { target: { value: '45' } });
    fireEvent.click(submitButton);

    // Verify timer updates
    expect(screen.getByText('00:00:45')).toBeInTheDocument();
  });

  it('renders all major sections of the app', () => {
    render(<App />);

    // Check for header
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check for main content
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
