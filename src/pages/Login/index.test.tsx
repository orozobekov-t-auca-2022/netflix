import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './index';

vi.mock('../../components/LoginForm', () => ({
  default: () => <div data-testid="login-form" />,
}));

describe('Login page', () => {
  test('renders LoginForm component', () => {
    render(<Login />);

    expect(screen.getByTestId('login-form')).toBeTruthy();
  });

  test('renders wrapper element around LoginForm', () => {
    const { container } = render(<Login />);

    const pageWrapper = container.firstElementChild as HTMLElement | null;

    expect(pageWrapper).not.toBeNull();
    expect(pageWrapper?.contains(screen.getByTestId('login-form'))).toBe(true);
  });
});
