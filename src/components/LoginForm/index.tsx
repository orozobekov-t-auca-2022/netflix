import styles from './Login.module.css';
import ResetButton from './components/ResetButton';
import LoginButton from './components/LoginButton';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { validateForm, type ValidationRules } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/useAuth';

interface LoginFormData extends Record<string, string> {
  email: string;
  password: string;
}

function LoginForm() {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, isLoading] = useState(false);
  const [isSubmited, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validationRules: ValidationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newErrors: Record<string, string> = validateForm(
      formData,
      validationRules
    );
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      isLoading(true);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : 'Login failed',
      });
    } finally {
      isLoading(false);
      const body = document.querySelector('body');
      if (body) {
        body.style.overflow = 'auto';
      }
      body?.style.setProperty('background-color', 'rgba(35, 35, 35, 1)');
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputs}>
          <label className={styles.label} htmlFor="email">
            <span className={styles.inputTitle}>
              Email
              {isSubmited && !!errors.email && (
                <span className={styles.error}> is required</span>
              )}
            </span>
            <EmailInput
              value={formData.email}
              onChange={handleChange}
              error={isSubmited && !!errors.email}
            />
            {errors.email && isSubmited && (
              <span className={styles.emailError}>{errors.email}</span>
            )}
          </label>
          <label className={styles.label} htmlFor="password">
            <span className={styles.inputTitle}>
              Password
              {isSubmited && !!errors.password && (
                <span className={styles.error}> is required</span>
              )}
            </span>
            <PasswordInput
              value={formData.password}
              onChange={handleChange}
              error={isSubmited && !!errors.password}
            />
          </label>
        </div>
        <div className={styles.buttons}>
          {loading && <span className={styles.loading}>Logging in...</span>}
          <ResetButton onClick={handleReset} />
          <LoginButton />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
