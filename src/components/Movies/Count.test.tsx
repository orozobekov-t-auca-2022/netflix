import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Count from './Count';

describe('Count', () => {
  test('renders singular form for one movie', () => {
    render(<Count count={1} />);

    expect(screen.getByText('1 movie found')).toBeTruthy();
  });

  test('renders plural form for many movies', () => {
    render(<Count count={3} />);

    expect(screen.getByText('3 movies found')).toBeTruthy();
  });
});
