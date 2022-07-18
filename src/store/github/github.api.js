import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/"
  }),
  endpoints: (build) => ({
    searchUsers: build.query({
      query: (search) => ({
        url: `search/users`,
        params: {
          q: search
        }
      }),
      transformResponse: (Response) => Response.items
    }),
    getUserRepos: build.query({
      query: (username) => ({
        url: `users/${username}/repos`
      })
    })
  })
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
