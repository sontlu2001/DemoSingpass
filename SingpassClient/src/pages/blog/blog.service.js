import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { VITE_STRAPI_BASE_URL, VITE_STRAPI_BEARER_TOKEN } = import.meta.env;

export const blogApi = createApi({
  reducerPath: "blogApi",

  baseQuery: fetchBaseQuery({ baseUrl: VITE_STRAPI_BASE_URL, headers: {
    Authorization: `Bearer ${VITE_STRAPI_BEARER_TOKEN}`,
  } }),
  
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "blogs"
     
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "blogs",
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
