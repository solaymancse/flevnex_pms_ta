import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSliceAdmin = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      // from redux state
      const admin_access_token = getState().userAuth?.admin_token;

      // from local storage
      const token = localStorage.getItem("admin_token");

      // set token
      headers.set("authorization", `Bearer ${token}`);

      // Set Content-Type to application/json
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "New Patient",
    "Edit Patient",
    "Count Patients"
   
  ],
});

export default apiSliceAdmin;
