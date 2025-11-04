import { combineReducers, configureStore, isRejected } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE } from "redux-persist";
import { PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer, { logout } from "./auth/authSlice";
import sidebarReducer from "./sidebar/sidebarSlice";
import toast from "react-hot-toast";
import { crudEndPointApi } from "../services/crudEndPointApi";

const tokenErrorToast = (api) => (next) => (action) => {
    if (isRejected(action)) {
        if (action.payload?.status === 403) {
            toast.error(
                action.payload?.data?.message ||
                "Your session has expired, please login again...",
                {
                    id: "tokenError",
                }
            );
            store.dispatch(logout());
        }
    }

    return next(action);
};

const persistConfig = {
    key: "mindclaire-admin",
    version: 2,
    storage,
    whitelist: ["auth", "sidebar", "settings"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    sidebar: sidebarReducer,
    [crudEndPointApi.reducerPath]: crudEndPointApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([
            tokenErrorToast,
            crudEndPointApi.middleware,
        ]),
});

export let persistor = persistStore(store);
export default store