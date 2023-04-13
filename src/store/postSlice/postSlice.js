import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import PostService from "../../services/post.service";
// import { userAPI } from "./userAPI";

const postService = new PostService();

export const fetchGetPostsAdmin = createAsyncThunk(
  "/posts",
  async (deleteFlag, thunkAPI) => {
    try {
      const response = await postService.getPostsAdmin(deleteFlag);
      return response.data;
    } catch (err) {
      return isRejectedWithValue(err.response.data);
    }
  }
);

export const fetchGetPosts = createAsyncThunk("/posts", async (thunkAPI) => {
  try {
    const response = await postService.getPosts();
    return response.data;
  } catch (err) {
    return isRejectedWithValue(err.response.data);
  }
});

export const fetchGetAvailablePosts = createAsyncThunk(
  "/posts",
  async (thunkAPI) => {
    try {
      const response = await postService.getAvailablePosts();
      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(err.response);
    }
  }
);

export const fetchGetPost = createAsyncThunk(
  "post",
  async (postId, thunkAPI) => {
    const response = await postService.getPostById(postId);
    return response.data;
  }
);

export const fetchCreatePost = createAsyncThunk(
  "post",
  async (createPostDto, thunkAPI) => {
    try {
      const response = await postService.createPost(createPostDto);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const fetchUpdatePost = createAsyncThunk(
  "post",
  async ({ postId, updatePostDto }, thunkAPI) => {
    try {
      const response = await postService.updatePostById(postId, updatePostDto);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "room",
  async (postId, thunkAPI) => {
    const response = await postService.deletePostById(postId);
    return response.data;
  }
);

const initialState = {
  entities: [],
  loading: "idle",
};

// Then, handle actions in your reducers:
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
