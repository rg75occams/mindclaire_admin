import AppRouter from "./navigation/AppRouter";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./features/store";
import { Toaster } from "react-hot-toast";
import './App.css';

const App = () => {
    const [mode, setMode] = useState("light");

    useLayoutEffect(() => {
        const savedMode = localStorage?.getItem("theme_mode");
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
            const initialMode = systemPrefersDark ? "dark" : "light";
            setMode(initialMode);
            localStorage?.setItem("theme_mode", initialMode);
        }
    }, []);

    useEffect(() => {
        document.body.setAttribute("data-theme", mode);
    }, [mode]);

    return (
        <Fragment>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouter />
                </PersistGate>
            </Provider>

            <Toaster position="top-right" toastOptions={{
                success: { style: { background: "green", color: "white" } },
                error: { style: { background: "red", color: "white" } },
            }} />
        </Fragment>
    );
};

export default App