import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { VITE_STRAPI_BASE_URL, VITE_STRAPI_BEARER_TOKEN } = import.meta.env;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_STRAPI_BASE_URL,
    headers: {
      Authorization: `Bearer ${VITE_STRAPI_BEARER_TOKEN}`,
    },
  }),
  endpoints: (builder) => ({
    login: builder.query({
      query: () => "auth/local",
    }),
  }),
});

export const { useLoginQuery } = authApi;
