import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../login/Login'
import App from '../App';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}