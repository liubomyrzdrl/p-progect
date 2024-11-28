import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token?.startsWith('"') && token.endsWith('"')) {
        headers.set("Authorization", `Bearer ${token.slice(1, -1)}`);
      } else {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getUser: builder.query({
      query: (params) => {
        console.log('Id', params);
        if (!params?.id) {
            throw new Error('Missing required parameter: id');
          }
        return {
        url: `/user/${params.id}`,
        method: "GET",
      }},
      providesTags: () => ['User'],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
