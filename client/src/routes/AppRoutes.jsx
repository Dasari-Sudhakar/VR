import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TourPage from '../pages/TourPage';
import AuthPage from '../pages/auth/AuthPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/tour/:tourId" element={<TourPage />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/signup" element={<AuthPage mode="signup" />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
