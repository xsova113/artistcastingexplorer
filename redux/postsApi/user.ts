// Need to use the React-specific entry point to import createApi
import { WPUser } from "@/types/wpUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://castingjapanese.ca/wp-json/wp/v2",
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUsers: builder.query<WPUser, number | undefined>({
      query: (userId) => `users/${userId}`,
      providesTags: ["user"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useLazyGetUsersQuery  } = userApi;
