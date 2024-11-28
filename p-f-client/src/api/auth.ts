import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8082/api" }),
  endpoints: (builder) => ({
    authGet: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
    authLogin: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    authRegister: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAuthLoginMutation, useAuthRegisterMutation, useAuthGetQuery } = authApi;
