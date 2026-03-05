import { Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default PrivateRoute;
