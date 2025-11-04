import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error?.message || "Unknown error" };
    }

    componentDidCatch(error, info) {
        console.error("🚨 ErrorBoundary caught an error:", error, info);
    }

    handleRefresh = () => {
        this.setState({ hasError: false, errorMessage: "" }, () => {
            window.location.reload(true);
        });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-[calc(100vh-150px)] flex items-center justify-center">
                    <div className="text-center">
                        <AlertTriangle className="mx-auto" size={80} style={{ color: "var(--main-color)" }} />
                        <h1 className="mt-3 text-2xl font-bold text-black dark:text-white">
                            {process.env.NODE_ENV !== "production" ? this.state.errorMessage : "Something went wrong"}
                        </h1>

                        <p className="mt-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
                            There was a problem processing the request. Please try again.
                        </p>

                        <button onClick={this.handleRefresh} className="inline-flex items-center gap-2 rounded-md
                            px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700 focus:outline-none 
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <RotateCw size={16} />
                            Refresh
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary