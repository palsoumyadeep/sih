import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { StudentPortal } from '../src/components/student-portal';

describe('Form validation', () => {
  it('requires email and password for login', async () => {
    const { container } = render(<StudentPortal onNavigate={vi.fn()} />);
    const form = container.querySelector('form') as HTMLFormElement;
    const email = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    const password = screen.getByLabelText(/^Password$/i) as HTMLInputElement;

    expect(email).toBeRequired();
    expect(password).toBeRequired();
    expect(form.checkValidity()).toBe(false);

    await userEvent.type(email, 'student@uni.edu');
    await userEvent.type(password, 'password');
    expect(form.checkValidity()).toBe(true);
  });
});
