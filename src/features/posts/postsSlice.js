// src/features/posts/postsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getPosts, 
  getPost, 
  createPost as apiCreatePost, 
  updatePost as apiUpdatePost, 
  deletePost as apiDeletePost 
} from '../../services/api'; 

// 1. 비동기 Thunk 정의 (Read - 목록)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPosts();
  return response; 
});

// 2. 비동기 Thunk 정의 (Read - 상세)
export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (postId) => {
    const response = await getPost(postId);
    return response;
  }
);

// 3. 비동기 Thunk 정의 (Create)
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await apiCreatePost(initialPost);
    return response;
  }
);

// 4. 비동기 Thunk 정의 (Update)
export const updateExistingPost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost) => {
    const response = await apiUpdatePost(initialPost.id, initialPost);
    return response;
  }
);

// 5. 비동기 Thunk 정의 (Delete)
export const deleteExistingPost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await apiDeletePost(postId);
    return postId; 
  }
);


// 6. Slice 생성 및 초기 상태 정의
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [], 
    currentPost: null,
    status: 'idle', // 전체 목록 상태: 'idle' | 'loading' | 'succeeded' | 'failed'
    currentPostStatus: 'idle', // 상세 게시물 로딩 상태
    error: null,
  },
  reducers: {},
  // 7. extraReducers: 모든 비동기 Thunk의 상태를 처리합니다.
  extraReducers(builder) {
    builder
      // 목록 가져오기
      .addCase(fetchPosts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // 상세 정보 가져오기
      .addCase(fetchPostById.pending, (state) => {
        state.currentPostStatus = 'loading';
        state.currentPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPostStatus = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPostStatus = 'failed';
        state.error = action.error.message;
      })

      // 게시물 생성 (Create)
      .addCase(addNewPost.pending, (state) => { state.status = 'loading'; })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // 게시물 수정 (Update)
      .addCase(updateExistingPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedPost = action.payload;
        const existingPostIndex = state.items.findIndex(post => post.id === updatedPost.id);
        
        if (existingPostIndex !== -1) {
          state.items[existingPostIndex] = updatedPost;
        }
      })
      
      // 게시물 삭제 (Delete)
      .addCase(deleteExistingPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedPostId = action.payload;
        state.items = state.items.filter(post => post.id !== deletedPostId);
        
        if (state.currentPost && state.currentPost.id === deletedPostId) {
            state.currentPost = null;
        }
      });
  },
});

// 8. 리듀서를 외부로 내보냅니다. (파일당 단 한 번)
export default postsSlice.reducer;