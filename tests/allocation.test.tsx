import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { StudentPortal } from '../src/components/student-portal';

async function loginAndCreateProfile() {
  render(<StudentPortal onNavigate={vi.fn()} />);
  await userEvent.type(screen.getByLabelText(/Email Address/i), 'student@uni.edu');
  await userEvent.type(screen.getByLabelText(/^Password$/i), 'password');
  await userEvent.click(screen.getByRole('button', { name: /login to dashboard/i }));
  await userEvent.type(screen.getByLabelText(/College\/University/i), 'IIT');
  await userEvent.type(screen.getByLabelText(/Course\/Degree/i), 'B.Tech');
  await userEvent.type(screen.getByLabelText(/Year of Study/i), '3');
  await userEvent.type(screen.getByLabelText(/CGPA\/Percentage/i), '8.5');
  await userEvent.type(screen.getByLabelText(/Skills/i), 'React');
  await userEvent.click(screen.getByRole('button', { name: /create profile/i }));
}

describe('Allocation results', () => {
  it('shows internship allocation after refreshing', async () => {
    await loginAndCreateProfile();
    await userEvent.click(screen.getByRole('tab', { name: /My Internship/i }));
    expect(screen.getByText(/No Internship Allocated/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /Refresh Status/i }));
    expect(await screen.findByText(/Internship Allocated!/i)).toBeInTheDocument();
  });
});
