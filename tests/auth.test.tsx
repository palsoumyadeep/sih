import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { StudentPortal } from '../src/components/student-portal';

describe('Authentication flows', () => {
  it('logs in an existing student', async () => {
    render(<StudentPortal onNavigate={vi.fn()} />);
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'student@uni.edu');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'password');
    await userEvent.click(screen.getByRole('button', { name: /login to dashboard/i }));
    expect(await screen.findByText(/Create Your Profile/i)).toBeInTheDocument();
  });

  it('registers a new student', async () => {
    render(<StudentPortal onNavigate={vi.fn()} />);
    await userEvent.click(screen.getByRole('tab', { name: /register/i }));
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'john@uni.edu');
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'secret');
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(await screen.findByText(/Create Your Profile/i)).toBeInTheDocument();
  });
});
