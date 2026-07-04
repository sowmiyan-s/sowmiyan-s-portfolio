import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    // Keep logs for debugging too
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const message = this.state.error?.message ?? "Unknown error";
    const stack = this.state.error?.stack ?? "";

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          padding: 24,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
          Runtime error (blank screen protection)
        </div>
        <div style={{ color: "#ff4d4d", marginBottom: 12 }}>
          {message}
        </div>
        {stack ? (
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "rgba(255,0,0,0.08)",
              border: "1px solid rgba(255,0,0,0.25)",
              padding: 12,
              borderRadius: 8,
              maxHeight: "70vh",
              overflow: "auto",
            }}
          >
            {stack}
          </pre>
        ) : null}
      </div>
    );
  }
}
