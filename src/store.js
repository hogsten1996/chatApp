import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./reducers/api";
import authReducer from './reducers/auth'

const store = configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
