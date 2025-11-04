import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { crudEndPointApi } from "../services/crudEndPointApi";

const AlertBox = ({ children }) => (
    <div className="mb-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm">
        {children}
    </div>
);

const GlobalErrorHandler = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const { error, isError } = useSelector(
        crudEndPointApi.endpoints.getAllEndPoints.select()
    );

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    if (!isOnline) {
        return <AlertBox>❌ No Internet Connection</AlertBox>;
    }

    if (isError) {
        return (
            <AlertBox>
                ⚠️ Server Error: {error?.data?.message || "Something went wrong!"}
            </AlertBox>
        );
    }

    return null;
};

export default GlobalErrorHandler;