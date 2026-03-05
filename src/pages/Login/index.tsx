import LoginForm from '../../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';
import styles from './Login.module.css';

function Login() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}

export default Login;
