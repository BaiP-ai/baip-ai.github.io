import React, { useState, useEffect, ErrorInfo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles.css';

// Error boundary to handle unexpected errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, errorInfo: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      errorInfo: error.message || 'An unexpected error occurred'
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-sky-50 p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="text-sky-800 mb-6">{this.state.errorInfo}</p>
            <p className="text-sky-700 mb-6">Please try refreshing the page or contact support if the problem persists.</p>
          </div>
        </div>
      );
    }

    return this.props.children; // Render children normally if no error
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add other routes here if needed */}
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
