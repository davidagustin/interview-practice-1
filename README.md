# Interview Practice 1

A repository for interview practice exercises and solutions.

## Countdown Timer

A React TypeScript countdown timer application built with best practices.

### Features

- ⏱️ **Countdown Timer**: Set custom time in hours, minutes, and seconds
- ▶️ **Start/Pause Controls**: Control the timer with intuitive buttons
- 🔄 **Reset Functionality**: Reset the timer to initial time
- ✅ **Completion Callback**: Optional callback when timer reaches zero
- ♿ **Accessible**: ARIA labels and semantic HTML for screen readers
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient background and clean interface

### Best Practices Implemented

1. **TypeScript**: Full type safety with proper interfaces and types
2. **React Hooks**: 
   - `useState` for state management
   - `useEffect` for side effects and cleanup
   - `useRef` for interval reference (prevents stale closures)
   - `useCallback` for memoized functions
3. **Memory Management**: Proper cleanup of intervals on unmount
4. **Component Separation**: Modular components (CountdownTimer, TimeInput)
5. **Error Prevention**: Input validation and edge case handling
6. **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

### Project Structure

```
src/
  components/
    CountdownTimer.tsx  # Main countdown timer component
    TimeInput.tsx       # Time input form component
  App.tsx              # Main application component
  main.tsx             # Application entry point
  App.css              # Application styles
  index.css            # Global styles
```

### Technologies

- React 18
- TypeScript
- Vite
- CSS3

