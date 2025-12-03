// src/pages/PostDetailPage.jsx

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
// 👈 Redux 훅 import
import { useSelector, useDispatch } from 'react-redux'; 
// 👈 Slice에서 정의한 상세 정보 Thunk import
import { fetchPostById } from '../features/posts/postsSlice'; 

/**
 * Redux Store에서 특정 게시물의 상세 정보를 가져와 표시하는 페이지입니다.
 */
function PostDetailPage() {
  const { postId } = useParams(); 
  const dispatch = useDispatch();

  // 1. Selector 훅: Store에서 상세 게시물 상태 구독 (읽기)
  const post = useSelector(state => state.posts.currentPost);
  const postStatus = useSelector(state => state.posts.currentPostStatus);
  const error = useSelector(state => state.posts.error);

  // 2. useEffect: 컴포넌트 마운트 및 postId 변경 시 상세 정보 로딩
  useEffect(() => {
    // 이미 성공적으로 로드되었거나, 현재 로딩 중이 아니라면 액션 디스패치
    if (postId) {
      // 👈 fetchPostById Thunk 액션을 디스패치 (postId를 인수로 전달)
      dispatch(fetchPostById(postId));
    }
  // 의존성 배열에 postId와 dispatch를 추가하는 것이 표준입니다.
  }, [postId, dispatch]); 

  // 3. 조건부 렌더링: Redux 상태를 기반으로 UI 표시
  if (postStatus === 'loading') {
    return <div>Redux로 상세 정보 로딩 중입니다...</div>;
  }

  if (postStatus === 'failed') {
    return <div style={{ color: 'red' }}>오류: {error}</div>;
  }
  
  // 데이터가 로드되었지만 내용이 없는 경우 (예: 404)
  if (postStatus === 'succeeded' && !post) {
      return <div>존재하지 않는 게시물입니다.</div>;
  }

  // 4. 상세 정보 렌더링
  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p><strong>게시물 ID:</strong> {post.id} / <strong>작성자 ID:</strong> {post.userId}</p>
      <hr />
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetailPage;