// src/components/PostItem.jsx

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 단일 게시물 항목을 렌더링하는 컴포넌트입니다.
 * React.memo로 감싸서, props가 변경되지 않으면 리렌더링을 건너뜁니다. (최적화 핵심)
 */
const PostItem = ({ post }) => {
  // 실제 프로젝트에서는 이 로그를 제거해야 합니다. 최적화 확인용입니다.
  console.log(`[Memo Check] PostItem ${post.id} 렌더링`); 
  
  return (
    <li key={post.id} className="post-item">
      <Link to={`/posts/${post.id}`} className="post-link">
        <h3>{post.title}</h3>
        {/* body는 너무 길 수 있으므로 100자까지만 표시합니다. */}
        <p>{post.body.substring(0, 100)}...</p>
      </Link>
    </li>
  );
};

// 👈 React.memo 적용: props가 얕은 비교(Shallow Comparison)를 통과할 때만 리렌더링
export default React.memo(PostItem);