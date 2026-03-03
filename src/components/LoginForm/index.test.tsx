import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './index';
import { useAuth } from '../../provider/useAuth';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../provider/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);
const loginMock = vi.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    loginMock.mockReset();
    loginMock.mockResolvedValue(undefined);

    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: loginMock,
      logout: vi.fn(),
      isAdmin: false,
      isAuthenticated: false,
    });
  });

  test('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getAllByText(/is required/i).length).toBeGreaterThanOrEqual(
      2
    );
    expect(screen.getByText('This field is required')).toBeTruthy();
    expect(loginMock).not.toHaveBeenCalled();
  });

  test('shows invalid email format error', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('enter email'), 'wrong-email');
    await user.type(screen.getByPlaceholderText('enter password'), '123456');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Invalid email format')).toBeTruthy();
    expect(loginMock).not.toHaveBeenCalled();
  });

  test('resets entered values when reset is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('enter email');
    const passwordInput = screen.getByPlaceholderText('enter password');

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'secret');
    await user.click(screen.getByRole('button', { name: 'Reset' }));

    expect((emailInput as HTMLInputElement).value).toBe('');
    expect((passwordInput as HTMLInputElement).value).toBe('');
  });

  test('submits valid credentials and navigates to home', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText('enter email'),
      'user@test.com'
    );
    await user.type(screen.getByPlaceholderText('enter password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(loginMock).toHaveBeenCalledWith('user@test.com', 'secret');
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('does not navigate when login rejects', async () => {
    const user = userEvent.setup();
    loginMock.mockRejectedValueOnce(new Error('Invalid email or password'));
    render(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText('enter email'),
      'user@test.com'
    );
    await user.type(screen.getByPlaceholderText('enter password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(loginMock).toHaveBeenCalledWith('user@test.com', 'secret');
    expect(navigateMock).not.toHaveBeenCalled();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('Invalid email or password');
  });
});
