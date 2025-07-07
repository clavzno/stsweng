"use client"; // Add this directive for client-side hooks

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // CHANGE: Import from next/navigation
import Link from 'next/link'; // CHANGE: Import from next/link
import { useAuth } from '../../context/AuthContext';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import bgImage from '../assets/images/background.png';
import { render } from '@testing-library/react';
import SignupPage from '../SignupPage';

//  Mock useAuth
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    signup: jest.fn(),
  }),
}));

//  Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test('renders SignupPage without crashing', () => {
  render(<SignupPage />);
});


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signup } = useAuth();
  const router = useRouter(); // CHANGE: Use useRouter

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    signup(username.trim());
    router.push('/dashboard'); // CHANGE: Use router.push
  };

  // ... (rest of your component's style constants)
  const containerClasses = 'min-h-screen flex items-center justify-center bg-cover bg-center';
  const backgroundStyle = {
    backgroundImage: `url(${bgImage.src})`, // Add .src for Next.js Image import
  };
  const cardClasses =
    'max-w-md w-full p-8 bg-dark-bg/80 border border-primary/20 backdrop-blur-md rounded-xl shadow-2xl';
  const headingClasses = 'text-3xl text-white text-center mb-6 font-orbitron';
  const footerTextClasses = 'mt-6 text-center text-sm text-gray-300 font-roboto';
  const footerLinkClasses = 'text-orange hover:text-red transition-colors duration-200';


  return (
    <div className={`${containerClasses} bg-dark-bg`} style={backgroundStyle}>
      <div className={cardClasses}>
        <h2 className={headingClasses}>Sign Up</h2>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <FormInput
            id="signup-username"
            type="text"
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email Address"
          />
          <FormInput
            id="signup-password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <FormInput
            id="signup-confirm-password"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <FormButton variant="green">Create Account</FormButton>
        </form>
        <p className={footerTextClasses}>
          Already have an account?{' '}
          {/* CHANGE: Use href prop for Next.js Link */}
          <Link href="/login" className={footerLinkClasses}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}