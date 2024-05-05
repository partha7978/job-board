import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";

const appStore = configureStore({
    reducer: {
        jobs: jobReducer,
    }
});

export default appStore;