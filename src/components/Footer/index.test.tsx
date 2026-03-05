import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './index';

describe('Footer', () => {
  test('renders app logo text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: /netflix\s+roulette/i })
    ).toBeTruthy();
  });

  test('logo links to home page', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', {
      name: /netflix\s+roulette/i,
    });

    expect(logoLink.getAttribute('href')).toBe('/');
  });
});
