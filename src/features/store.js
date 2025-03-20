import { apiSlice } from "@/features/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import languageReducer from "./languageReducer";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  language: languageReducer
});



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

