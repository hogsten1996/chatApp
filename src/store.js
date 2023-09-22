import { configureStore } from "@reduxjs/toolkit";
import { storeApi } from "./reducers/api";
import authReducer from './reducers/auth'
import dataReducer from './reducers/api'

const store = configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        auth: authReducer,
        data:dataReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});

export default store;
