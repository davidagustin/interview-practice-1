import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeInput } from './TimeInput';

describe('TimeInput', () => {
  it('renders all input fields and labels', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set Time' })).toBeInTheDocument();
  });

  it('accepts valid numeric input for hours', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const hoursInput = screen.getByLabelText('Hours') as HTMLInputElement;
    fireEvent.change(hoursInput, { target: { value: '2' } });

    expect(hoursInput.value).toBe('2');
  });

  it('accepts valid numeric input for minutes within range', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const minutesInput = screen.getByLabelText('Minutes') as HTMLInputElement;
    fireEvent.change(minutesInput, { target: { value: '30' } });

    expect(minutesInput.value).toBe('30');
  });

  it('accepts valid numeric input for seconds within range', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const secondsInput = screen.getByLabelText('Seconds') as HTMLInputElement;
    fireEvent.change(secondsInput, { target: { value: '45' } });

    expect(secondsInput.value).toBe('45');
  });

  it('rejects minutes above 59', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const minutesInput = screen.getByLabelText('Minutes') as HTMLInputElement;
    fireEvent.change(minutesInput, { target: { value: '60' } });

    expect(minutesInput.value).toBe('0');
  });

  it('rejects seconds above 59', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const secondsInput = screen.getByLabelText('Seconds') as HTMLInputElement;
    fireEvent.change(secondsInput, { target: { value: '60' } });

    expect(secondsInput.value).toBe('0');
  });

  it('rejects hours above 99', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const hoursInput = screen.getByLabelText('Hours') as HTMLInputElement;
    fireEvent.change(hoursInput, { target: { value: '100' } });

    expect(hoursInput.value).toBe('0');
  });

  it('rejects non-numeric input', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const hoursInput = screen.getByLabelText('Hours') as HTMLInputElement;
    fireEvent.change(hoursInput, { target: { value: 'abc' } });

    expect(hoursInput.value).toBe('0');
  });

  it('calls onSetTime with correct total seconds on form submission', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const hoursInput = screen.getByLabelText('Hours');
    const minutesInput = screen.getByLabelText('Minutes');
    const secondsInput = screen.getByLabelText('Seconds');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(hoursInput, { target: { value: '1' } });
    fireEvent.change(minutesInput, { target: { value: '30' } });
    fireEvent.change(secondsInput, { target: { value: '45' } });
    fireEvent.click(submitButton);

    // 1 hour (3600s) + 30 minutes (1800s) + 45 seconds = 5445 seconds
    expect(mockOnSetTime).toHaveBeenCalledWith(5445);
  });

  it('does not call onSetTime when total seconds is zero', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const submitButton = screen.getByRole('button', { name: 'Set Time' });
    fireEvent.click(submitButton);

    expect(mockOnSetTime).not.toHaveBeenCalled();
  });

  it('calculates total seconds correctly with only hours', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const hoursInput = screen.getByLabelText('Hours');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(hoursInput, { target: { value: '2' } });
    fireEvent.click(submitButton);

    expect(mockOnSetTime).toHaveBeenCalledWith(7200); // 2 hours = 7200 seconds
  });

  it('calculates total seconds correctly with only minutes', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const minutesInput = screen.getByLabelText('Minutes');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(minutesInput, { target: { value: '15' } });
    fireEvent.click(submitButton);

    expect(mockOnSetTime).toHaveBeenCalledWith(900); // 15 minutes = 900 seconds
  });

  it('calculates total seconds correctly with only seconds', () => {
    const mockOnSetTime = vi.fn();
    render(<TimeInput onSetTime={mockOnSetTime} />);

    const secondsInput = screen.getByLabelText('Seconds');
    const submitButton = screen.getByRole('button', { name: 'Set Time' });

    fireEvent.change(secondsInput, { target: { value: '30' } });
    fireEvent.click(submitButton);

    expect(mockOnSetTime).toHaveBeenCalledWith(30);
  });
});
