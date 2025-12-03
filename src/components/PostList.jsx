// src/components/PostList.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchPosts } from '../features/posts/postsSlice'; 
import PostItem from './PostItem'; // PostItem은 별도의 파일에 React.memo가 적용되어 있습니다.

/**
 * Redux Store에서 포스트 목록을 가져와 표시하는 컴포넌트입니다.
 */
function PostList() {
  const dispatch = useDispatch(); 
  const posts = useSelector(state => state.posts.items);
  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]); 

  let content;
  
  if (postStatus === 'loading') {
    content = <div className="loading-message">Redux로 데이터 로딩 중입니다...</div>;
  } else if (postStatus === 'succeeded') {
    content = (
      <ul>
        {posts.map(post => (
          // PostItem 컴포넌트를 사용합니다.
          <PostItem key={post.id} post={post} /> 
        ))}
      </ul>
    );
  } else if (postStatus === 'failed') {
    content = <div className="error-message" style={{ color: 'red' }}>오류: {error}</div>;
  }

  return (
    <div className="post-list-container">
      <h2>포스트 목록 ({posts.length}개)</h2>
      {content}
    </div>
  );
}

// 👈 중요: 이 줄이 파일의 맨 마지막에 반드시 있어야 합니다.
export default PostList;