import LoginForm from '../../components/LoginForm';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}

export default Login;
