// src/app/store.js

// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
// 👈 이제 이 경로는 'postsSlice.js'를 정확히 가리킵니다.
import postsReducer from '../features/posts/postsSlice'; 
// ...

/**
 * Redux Store를 설정하는 표준 함수입니다.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    // 다른 Slice가 있다면 여기에 계속 등록됩니다.
  },
});