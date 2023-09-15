// Need to use the React-specific entry point to import createApi
import { Post } from "@/types/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://castingjapanese.ca/wp-json/wp/v2",
  }),
  tagTypes: ["post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post, string>({
      query: (postId) => `posts/${postId}`,
      providesTags: ["post"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostsQuery, useLazyGetPostsQuery } = postApi;
