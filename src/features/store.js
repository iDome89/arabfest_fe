import { apiSlice } from "@/features/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
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

