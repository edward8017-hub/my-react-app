import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 👈 중요: 배포 환경의 루트 경로를 명시적으로 설정합니다.
  base: '/', 
  plugins: [react()],
});