// src/components/Header.jsx
import React from 'react';
// 👈 중요: React Router DOM에서 Link 컴포넌트를 import 합니다.
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className="app-header">
      <h1>
        {/* Link 컴포넌트로 변경: 메인 페이지로 이동 */}
        <Link to="/">My Standard React App</Link>
      </h1>
      <nav>
        <ul>
          {/* <a> 태그를 Link 컴포넌트로 변경 (href 대신 to 속성 사용) */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;