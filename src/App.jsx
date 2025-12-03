// src/App.jsx

// ... (기존 import 유지)
import Header from './components/Header'; 
// 👈 수정: .tsx 대신 .jsx로 가져오도록 경로를 수정하거나, 확장자를 지워줍니다.
import HomePage from './pages/HomePage'; // (혹은 './pages/HomePage.jsx')
import AboutPage from './pages/AboutPage'; // (혹은 './pages/AboutPage.jsx')
import PostDetailPage from './pages/PostDetailPage'; // (혹은 './pages/PostDetailPage.jsx')
import './App.css'; 

// ... (나머지 코드 유지)
/**
 * 최상위 애플리케이션 컴포넌트입니다.
 * 라우팅 시스템을 감싸고, Header와 Footer 등 공통 요소를 배치합니다.
 */
function App() {
  return (
    // BrowserRouter로 전체 앱을 감싸 라우팅 기능을 활성화합니다.
    <BrowserRouter>
      <div className="app-container">
        {/* Header는 모든 페이지에 공통으로 표시됩니다. */}
        <Header />
        
        <main className="app-content">
          {/* Routes: 라우팅 경로를 정의하는 영역입니다. */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* 동적 라우트: /posts/1, /posts/2 등으로 접속 가능 */}
            <Route path="/posts/:postId" element={<PostDetailPage />} /> 

            {/* 일치하는 경로가 없을 경우 (404) 처리 */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App; // 반드시 export 되어야 합니다.