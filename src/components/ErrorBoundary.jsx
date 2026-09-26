
import React from "react";

import {
  useNavigate,
} from "react-router-dom";

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error,
    errorInfo
  ) {
    console.error(
      "Application Error:",
      error
    );

    console.error(
      "Error Info:",
      errorInfo
    );

    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({
  children,
}) {
  const navigate =
    useNavigate();

  function handleError() {
    navigate(
      "/404",
      {
        replace: true,
      }
    );
  }

  return (
    <ErrorBoundaryClass
      onError={handleError}
    >
      {children}
    </ErrorBoundaryClass>
  );
}

