// SettingsForm.jsx
import React, { useState } from 'react';

// ============================================
// Validation helpers (pure, testable)
// ============================================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
    name: (value) =>
        value.trim() === '' ? 'Name is required' : '',

    email: (value) => {
        if (value.trim() === '') return 'Email is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
        return '';
    },

    password: (value) => {
        if (value === '') return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
    },
};

const validateAll = (values) => ({
    name: validators.name(values.name),
    email: validators.email(values.email),
    password: validators.password(values.password),
});

const initialValues = { name: '', email: '', password: '' };

// ============================================
// Reusable Field component
// ============================================
function Field({ id, label, type = 'text', value, error, touched, onChange, onBlur }) {
    const showError = touched && error;
    const errorId = `${id}-error`;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                aria-invalid={showError ? 'true' : 'false'}
                aria-describedby={showError ? errorId : undefined}
                className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-0
          ${showError
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-indigo-400'
                    }`}
            />
            {showError && (
                <p id={errorId} role="alert" className="mt-1 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

// ============================================
// Main Settings Form
// ============================================
export default function SettingsForm() {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const errors = validateAll(values);
    const isValid = Object.values(errors).every((e) => e === '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (submitted) setSubmitted(false); // hide success once editing resumes
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mark all fields touched so any lingering errors surface
        setTouched({ name: true, email: true, password: true });

        if (!isValid) return;

        console.log('Form submitted:', values);
        setSubmitted(true);
    };

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-md"
        >
            <h2 className="mb-6 text-xl font-semibold text-gray-800">Settings</h2>

            <Field
                id="name"
                label="Name"
                value={values.name}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <Field
                id="email"
                label="Email"
                type="email"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <Field
                id="password"
                label="Password"
                type="password"
                value={values.password}
                error={errors.password}
                touched={touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <button
                type="submit"
                disabled={!isValid}
                aria-disabled={!isValid}
                className={`w-full rounded-md px-4 py-2 text-sm font-semibold text-white transition
          ${isValid
                        ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400'
                        : 'cursor-not-allowed bg-gray-300'
                    }`}
            >
                Save Settings
            </button>

            {submitted && isValid && (
                <p
                    role="status"
                    aria-live="polite"
                    className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700"
                >
                    ✅ Settings saved successfully!
                </p>
            )}
        </form>
    );
}