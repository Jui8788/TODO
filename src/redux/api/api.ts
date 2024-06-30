// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
//   endpoints: (builder) => ({
//     getTodos: builder.query({
//       query: () => ({
//         url: "/tasks",
//         method: "GET",
//       }),
//     }),
//     addTodo: builder.mutation({
//       query: (data) => {
//         console.log("Inside Base API=>", data);
//         return { url: "/task", method: "POST", body: "data" };
//       },
//     }),
//   }),
// });

// export const { useGetTodosQuery, useAddTodoMutation } = baseApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();

        if (priority) {
          params.append("priority", priority);
        }

        return {
          url: `/tasks`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        console.log("Inside Base API=>", data); // Log the data being sent
        return {
          url: "/task",
          method: "POST",
          body: JSON.stringify(data),
        };
      },
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        console.log("Inside Base API=>", options); // Log the data being sent
        return {
          url: `/task/${options.id}`,
          method: "PUT",
          body: JSON.stringify(options.data), // Stringify the object directly
        };
      },
      invalidatesTags: ["todo"],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation } =
  baseApi;
