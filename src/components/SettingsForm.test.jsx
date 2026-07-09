// SettingsForm.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SettingsForm, { validators } from './SettingsForm';
import { describe, test, expect, vi } from 'vitest';

// ---------------------------------------------
// Pure validator unit tests
// ---------------------------------------------
describe('validators', () => {
    test('name: empty is invalid, filled is valid', () => {
        expect(validators.name('')).toBe('Name is required');
        expect(validators.name('   ')).toBe('Name is required');
        expect(validators.name('Ada')).toBe('');
    });

    test('email: format enforced', () => {
        expect(validators.email('')).toBe('Email is required');
        expect(validators.email('not-an-email')).toMatch(/valid email/);
        expect(validators.email('a@b')).toMatch(/valid email/);
        expect(validators.email('user@example.com')).toBe('');
    });

    test('password: minimum length enforced', () => {
        expect(validators.password('')).toBe('Password is required');
        expect(validators.password('123')).toMatch(/at least 6/);
        expect(validators.password('123456')).toBe('');
    });
});

// ---------------------------------------------
// Component integration tests
// ---------------------------------------------
describe('SettingsForm', () => {
    test('renders all fields with accessible labels', () => {
        render(<SettingsForm />);
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('submit button is disabled initially (empty form)', () => {
        render(<SettingsForm />);
        expect(screen.getByRole('button', { name: /save settings/i })).toBeDisabled();
    });

    test('shows required error on blur of empty name', async () => {
        const user = userEvent.setup();
        render(<SettingsForm />);
        const name = screen.getByLabelText(/name/i);
        await user.click(name);
        await user.tab(); // blur
        expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    });

    test('shows error for invalid email', async () => {
        const user = userEvent.setup();
        render(<SettingsForm />);
        const email = screen.getByLabelText(/email/i);
        await user.type(email, 'bademail');
        await user.tab();
        expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    });

    test('shows error for short password', async () => {
        const user = userEvent.setup();
        render(<SettingsForm />);
        const password = screen.getByLabelText(/password/i);
        await user.type(password, '123');
        await user.tab();
        expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
    });

    test('enables submit button when all fields are valid', async () => {
        const user = userEvent.setup();
        render(<SettingsForm />);

        await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
        await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
        await user.type(screen.getByLabelText(/password/i), 'secret123');

        expect(screen.getByRole('button', { name: /save settings/i })).toBeEnabled();
    });

    test('logs data and shows success message on valid submit', async () => {
        const user = userEvent.setup();
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
        render(<SettingsForm />);

        await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace');
        await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
        await user.type(screen.getByLabelText(/password/i), 'secret123');
        await user.click(screen.getByRole('button', { name: /save settings/i }));

        expect(logSpy).toHaveBeenCalledWith('Form submitted:', {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            password: 'secret123',
        });
        expect(await screen.findByRole('status')).toHaveTextContent(/saved successfully/i);

        logSpy.mockRestore();
    });

    test('sets aria-invalid on fields with errors', async () => {
        const user = userEvent.setup();
        render(<SettingsForm />);
        const email = screen.getByLabelText(/email/i);
        await user.type(email, 'bad');
        await user.tab();
        expect(email).toHaveAttribute('aria-invalid', 'true');
    });

    test('success message disappears when editing resumes', async () => {
        const user = userEvent.setup();
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
        render(<SettingsForm />);

        await user.type(screen.getByLabelText(/name/i), 'Ada');
        await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
        await user.type(screen.getByLabelText(/password/i), 'secret123');
        await user.click(screen.getByRole('button', { name: /save settings/i }));

        expect(await screen.findByRole('status')).toBeInTheDocument();

        await user.type(screen.getByLabelText(/name/i), 'x');
        await waitFor(() =>
            expect(screen.queryByRole('status')).not.toBeInTheDocument()
        );
    });
});