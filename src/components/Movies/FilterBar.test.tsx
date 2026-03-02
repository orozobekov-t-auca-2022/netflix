import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import FilterBar from './FilterBar';

function LocationState() {
  const location = useLocation();

  return <div data-testid="location-search">{location.search}</div>;
}

describe('FilterBar', () => {
  test('marks All as active when filter is not set', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <FilterBar />
      </MemoryRouter>
    );

    const allLink = screen.getByRole('link', { name: 'All' });

    expect(allLink.className).not.toBe('');
  });

  test('sets filter and removes page when genre is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/movies?page=3']}>
        <FilterBar />
        <LocationState />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('link', { name: 'Comedy' }));

    expect(screen.getByTestId('location-search').textContent).toBe(
      '?filter=comedy'
    );
  });

  test('clears filter when All is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/movies?filter=drama&page=2']}>
        <FilterBar />
        <LocationState />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('link', { name: 'All' }));

    expect(screen.getByTestId('location-search').textContent).toBe('');
  });
});
