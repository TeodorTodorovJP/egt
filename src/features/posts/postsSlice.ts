import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { type PostType } from "./postsApiSlice"

export interface PostsSliceState {
  posts: PostType[] | []
}

const initialState: PostsSliceState = {
  posts: [],
}

export const postsSlice = createAppSlice({
  name: "posts",
  initialState,
  reducers: create => ({
    addAllPosts: create.reducer((state, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload
    }),
    updatePost: create.reducer((state, action: PayloadAction<PostType>) => {
      const postIndex = state.posts.findIndex(post => post.id === action.payload.id)
      state.posts[postIndex] = action.payload
    }),
    deletePost: create.reducer((state, action: PayloadAction<PostType>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload.id)
    }),
  }),
  selectors: {
    selectPosts: state => state.posts,
    selectPost: (state, id) => state.posts.filter(post => post.id === id)[0],
  },
})

// Action creators are generated for each case reducer function.
export const { updatePost, addAllPosts, deletePost } = postsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPosts, selectPost } = postsSlice.selectors
