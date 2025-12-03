// src/pages/HomePage.jsx
import React from 'react';
import PostList from '../components/PostList'; // PostList를 가져옵니다.

/**
 * 프로젝트의 홈 페이지입니다.
 * Post 목록을 보여주는 역할을 합니다.
 */
function HomePage() {
  return (
    <section>
      <h1>🏠 홈 (게시물 목록)</h1>
      <PostList />
    </section>
  );
}

export default HomePage;