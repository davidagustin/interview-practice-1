# ⏱️ Countdown Timer

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A beautiful, feature-rich countdown timer application built with React and TypeScript**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Project Structure](#-project-structure) • [Technologies](#-technologies)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Best Practices](#-best-practices)
- [Technologies](#-technologies)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This is a modern, accessible countdown timer application designed for interview practice and real-world use. Built with React 18 and TypeScript, it demonstrates best practices in component architecture, state management, and user experience design.

The application allows users to set custom countdown times in hours, minutes, and seconds, with full control over start, pause, and reset functionality. It features a clean, modern UI with a beautiful gradient background and responsive design that works seamlessly on both desktop and mobile devices.

---

## ✨ Features

### Core Functionality

- ⏱️ **Custom Time Input**: Set countdown time in hours, minutes, and seconds
- ▶️ **Start/Pause Controls**: Intuitive controls to start and pause the timer
- 🔄 **Reset Functionality**: Reset the timer to its initial time at any point
- ⏰ **Real-time Display**: Live countdown with formatted time display (HH:MM:SS)
- ✅ **Completion Notification**: Visual feedback when the timer reaches zero

### User Experience

- 🎨 **Modern UI**: Beautiful gradient background and clean, minimalist interface
- 📱 **Responsive Design**: Fully responsive layout that works on all screen sizes
- ♿ **Accessible**: ARIA labels, semantic HTML, and keyboard navigation support
- 🎯 **Input Validation**: Smart validation prevents invalid time entries
- 🔒 **Error Prevention**: Handles edge cases and prevents common errors

### Technical Excellence

- 🔷 **TypeScript**: Full type safety with comprehensive interfaces and types
- ⚡ **Performance**: Optimized with React hooks and efficient state management
- 🧹 **Memory Management**: Proper cleanup of intervals and event listeners
- 🏗️ **Modular Architecture**: Well-separated, reusable components
- 📦 **Modern Build**: Fast development and optimized production builds with Vite

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**

You can check your versions by running:

```bash
node --version
npm --version
```

### Installation

1. **Clone the repository** (or navigate to the project directory):

```bash
git clone <repository-url>
cd interview-practice1/blw
```

2. **Install dependencies**:

```bash
npm install
```

### Running the Application

#### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

#### Production Build

Build the application for production:

```bash
npm run build
```

The optimized build will be created in the `dist` directory.

#### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

#### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

---

## 💡 Usage

### Setting a Timer

1. Enter the desired time using the input fields:
   - **Hours**: 0-99
   - **Minutes**: 0-59
   - **Seconds**: 0-59

2. Click **"Set Time"** to initialize the timer

3. Use the control buttons:
   - **Start**: Begin the countdown
   - **Stop**: Pause the countdown
   - **Reset**: Reset to the initial time

### Example

To set a timer for 1 hour, 30 minutes, and 45 seconds:

1. Enter `1` in the Hours field
2. Enter `30` in the Minutes field
3. Enter `45` in the Seconds field
4. Click **"Set Time"**
5. Click **"Start"** to begin the countdown

The timer will display: `01:30:45` and count down to `00:00:00`.

---

## 📁 Project Structure

```
blw/
├── src/
│   ├── components/
│   │   ├── CountdownTimer.tsx    # Main countdown timer component
│   │   └── TimeInput.tsx          # Time input form component
│   ├── App.tsx                    # Main application component
│   ├── App.css                    # Application-specific styles
│   ├── index.css                  # Global styles and CSS variables
│   └── main.tsx                   # Application entry point
├── index.html                     # HTML template
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.node.json             # TypeScript config for Node.js
├── vite.config.ts                 # Vite build configuration
└── README.md                      # Project documentation
```

### Component Overview

- **`CountdownTimer`**: Manages the countdown logic, state, and display
  - Handles start/pause/reset functionality
  - Formats and displays time in HH:MM:SS format
  - Manages interval cleanup and memory management

- **`TimeInput`**: Provides the form interface for setting timer duration
  - Validates user input
  - Converts hours/minutes/seconds to total seconds
  - Prevents invalid entries

---

## 🏆 Best Practices

This project demonstrates several React and TypeScript best practices:

### 1. **TypeScript Implementation**
- ✅ Full type safety with interfaces and type annotations
- ✅ Proper typing for props, state, and event handlers
- ✅ Type-safe refs and DOM element access

### 2. **React Hooks Usage**
- ✅ `useState` for component state management
- ✅ `useEffect` for side effects and cleanup
- ✅ `useRef` for interval references (prevents stale closures)
- ✅ `useCallback` for memoized functions (where applicable)

### 3. **Memory Management**
- ✅ Proper cleanup of intervals in `useEffect` return function
- ✅ Clearing intervals on component unmount
- ✅ Preventing memory leaks with ref-based interval tracking

### 4. **Component Architecture**
- ✅ Separation of concerns (UI vs. logic)
- ✅ Reusable, modular components
- ✅ Single responsibility principle

### 5. **User Experience**
- ✅ Input validation and error prevention
- ✅ Disabled states for buttons when appropriate
- ✅ Clear visual feedback for user actions
- ✅ Accessible markup with ARIA labels

### 6. **Code Quality**
- ✅ ESLint configuration for code consistency
- ✅ Clean, readable code structure
- ✅ Meaningful variable and function names
- ✅ Proper error handling

---

## 🛠️ Technologies

This project is built with modern web technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 18.2.0 | UI library for building components |
| [TypeScript](https://www.typescriptlang.org/) | 5.2.2 | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) | 5.0.8 | Fast build tool and dev server |
| [ESLint](https://eslint.org/) | 8.55.0 | Code linting and quality |

### Development Dependencies

- `@types/react` & `@types/react-dom` - TypeScript definitions for React
- `@typescript-eslint/*` - TypeScript ESLint plugins
- `@vitejs/plugin-react` - Vite plugin for React
- `eslint-plugin-react-hooks` - React Hooks linting rules
- `eslint-plugin-react-refresh` - Fast Refresh support

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the existing code style
4. **Run linting** (`npm run lint`) and fix any issues
5. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Style Guidelines

- Follow the existing TypeScript and React patterns
- Ensure all linting checks pass
- Write clear, descriptive commit messages
- Add comments for complex logic
- Maintain accessibility standards

---

## 📄 License

This project is part of an interview practice repository. Feel free to use it for learning and practice purposes.

---

<div align="center">

**Built with ❤️ using React and TypeScript**

⭐ Star this repo if you find it helpful!

</div>
