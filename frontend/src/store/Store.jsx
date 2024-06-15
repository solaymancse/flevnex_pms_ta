// store.js
import { configureStore } from "@reduxjs/toolkit";
import apiSliceAdmin from "../feature/API/apiSliceAdmin";
// Adjust the path as needed

const store = configureStore({
  reducer: {
    [apiSliceAdmin.reducerPath]: apiSliceAdmin.reducer,
    // other reducers can be added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSliceAdmin.middleware),
});

export default store;
