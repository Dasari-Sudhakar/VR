import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/common/LoadingScreen';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen message="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
