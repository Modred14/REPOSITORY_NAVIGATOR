import React from "react";
import "./Error.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="Wentwrong">
          <h2>⚠️Something went wrong⚠️</h2>
          <p>
            Sorry, something went wrong. Please click the 'Reload' button to
            reload or click on 'Details' to see the error details. If the
            problem persists, check your internet connection or contact support
            for assistance.
          </p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />

            {this.state.errorInfo
              ? this.state.errorInfo.componentStack
              : "No stack trace available"}
          </details>
          <button className="Reload" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
