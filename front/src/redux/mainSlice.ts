import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import {IPost} from "back/models/types"
import { PostControllers } from "back/controllers/post";
import { ApiRoutes } from "back/types";

export interface IMainState {
  posts: IPost[];
  editingPostId?: string;
  pageCount: number;
  searchParams: URLSearchParams;
}

export const mainState: IMainState = {
  posts: [],
  pageCount: 0,
  searchParams: new URLSearchParams({}),
};

export const mainSlice = createSlice({
  name: "main",
  initialState: mainState,
  reducers: {
    getPosts: (
      state,
      { payload }: PayloadAction<Parameters<typeof ApiRoutes.getPosts>[0]>
    ) => {
      api
        .get<Awaited<ReturnType<typeof PostControllers.getPosts>>>(
          ApiRoutes.getPosts(payload)
        )
        .then(({ data }) => {
          state.posts = data.posts;
          state.pageCount = data.pageCount;
        });
    },
    getPostsBySearch: (
      state,
      { payload }: PayloadAction<Parameters<typeof ApiRoutes.getPostsBySearch>>
    ) => {
      api
        .get<Awaited<ReturnType<typeof PostControllers.getPostsBySearch>>>(
          ApiRoutes.getPostsBySearch(...payload)
        )
        .then(({ data }) => {
          state.posts = data.posts;
        });
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setEditingPostId: (state, action: PayloadAction<string>) => {
      state.editingPostId = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<any>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { actions: mainActions, reducer: mainReducer } = mainSlice;
