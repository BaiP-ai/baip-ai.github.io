import React from 'react';

class SplineErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('SplineErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return (
        <div className="w-full h-full">
          {this.props.fallback}
          {this.state.error && (
            <div className="absolute bottom-4 left-4 bg-red-900 bg-opacity-70 text-white p-2 rounded text-xs z-50">
              {this.state.error.message || 'Error loading 3D content'}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default SplineErrorBoundary;
