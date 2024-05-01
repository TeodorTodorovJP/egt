import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { type RootState } from "../../app/store"
import { deletePost, selectPost, updatePost } from "./postsSlice"
import { setError } from "../../errorSlice"

export interface PostType {
  id: string
  title: string
  userId: string
  body: string
}

export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  reducerPath: "postsApi",
  tagTypes: ["post", "posts"],
  endpoints: build => ({
    getUserPosts: build.query<PostType[], string>({
      query: id => `?userId=${id}`,
      providesTags: (posts, error, arg) =>
        posts ? [...posts.map(({ id }) => ({ type: "post" as const, id })), "post"] : ["post"],
      /**
       * The provided API supports only GET methods
       * When the query get's the user data replaces it with the updated data from the store
       * then updates's the cache, to simulate a real update.
       */
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            const store = getState() as RootState
            updateCachedData(draft => (store.posts.posts.length ? store.posts.posts : draft))
          }
        } catch (error) {
          dispatch(setError("An error occurred: " + error))
        }
      },
    }),
    getPost: build.query<PostType, string>({
      query: id => `/${id}`,
      providesTags: (result, error, id) => [{ type: "post", id }],
      // When the post is updated, the tags here will be invalidated
      // this will trigger a new query, after 'queryFulfilled' we replace
      // the returned value with what we stored
      async onQueryStarted(arg, { updateCachedData, getState, queryFulfilled, dispatch }) {
        try {
          // Wait for the query to finish
          const { data } = await queryFulfilled
          if (data) {
            // Get the store
            const store = getState() as RootState
            // Get the post from the store
            const post = selectPost(store, arg)
            // Update the cached data with the stored post
            updateCachedData(draft => {
              if (post) {
                return post
              } else {
                // To delete the element from the cache
                let voidValue: void
                return voidValue
              }
            })
          }
        } catch (error) {
          dispatch(setError("An error occurred: " + error))
        }
      },
    }),

    updatePost: build.mutation<PostType[], PostType>({
      query: post => ({
        url: `/${post.id}`,
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // transformResponse is not applicable for the task because it does not provide dispatch
      onCacheEntryAdded(arg, { dispatch }) {
        // When the cache is updated, update the store with the updated post
        // As if the API works
        dispatch(updatePost(arg))
      },
      invalidatesTags: (result, error, post) => [{ type: "post", id: post.id }],
    }),

    deletePost: build.mutation<PostType, PostType>({
      query: post => ({
        url: `/${post.id}`,
        method: "DELETE",
      }),
      // transformResponse is not applicable for the task because it does not provide dispatch
      onCacheEntryAdded(arg, { dispatch }) {
        // When the cache is updated, update the store with the updated post
        // As if the API works
        dispatch(deletePost(arg))
      },
      invalidatesTags: (result, error, post) => [{ type: "post", id: post.id }],
    }),
  }),
})

export const { useGetPostQuery, useUpdatePostMutation, useGetUserPostsQuery, useDeletePostMutation } = postsApiSlice
