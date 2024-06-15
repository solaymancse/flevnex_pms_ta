import apiSliceAdmin from "./API/apiSliceAdmin";

const newPatientApi = apiSliceAdmin.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/admin/create/patient`,
        body: data,
      }),
      invalidatesTags: ["New Patient"],
    }),
    getCategories: builder.query({
      query: () => ({
        method: "GET",
        url: `/admin/fetch/student_category`,
      }),
      providesTags: ["Student_Category"],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/admin/delete/patient/${id}`,
      }),
      invalidatesTags: ["New Patient"],
    }),
    editPatient: builder.mutation({
      query: ({ id, data }) => ({
        method: "PUT",
        url: `/admin/edit/patient/${id}`,
        body: data,
      }),
      invalidatesTags: ["Edit Patient"],
    }),
    countPatients: builder.query({
      query: () => ({
        method: "GET",
        url: `/admin/count/patients`,
      }),
      invalidatesTags: ["Count Patients"],
    }),
    countTodayPatients: builder.query({
      query: () => ({
        method: "GET",
        url: `/admin/count/today/patients`,
      }),
      invalidatesTags: ["Count Patients"],
    }),
    adminLogout: builder.mutation({
      query: () => ({
        method: "POST",
        url: `/auth/logout`,
      }),
      invalidatesTags: ["Count Patients"],
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useEditPatientMutation,
  useDeletePatientMutation,
  useCountPatientsQuery,
  useCountTodayPatientsQuery,
  useAdminLogoutMutation
} = newPatientApi;
