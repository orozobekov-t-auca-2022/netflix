import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchButton from './SearchButton';

describe('SearchButton', () => {
  test('renders button with search text', () => {
    render(<SearchButton />);

    expect(screen.getByRole('button', { name: /search/i })).toBeTruthy();
  });

  test('uses submit type when provided', () => {
    render(<SearchButton type="submit" />);

    const button = screen.getByRole('button', { name: /search/i });

    expect(button.getAttribute('type')).toBe('submit');
  });
});
