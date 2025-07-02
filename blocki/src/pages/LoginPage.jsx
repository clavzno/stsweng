"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import bgImage from '../assets/images/background.png';
import canvasLogo from '../assets/images/canvas_logo.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoadedAnimation, setHasLoadedAnimation] = useState(false);

  const { login } = useAuth();
  const router = useRouter(); // CHANGE: Use useRouter

  useEffect(() => {
    setHasLoadedAnimation(true);
  }, []);

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter a username and password.');
      return;
    }

    login(username);
    router.push('/dashboard'); // CHANGE: Use router.push
  };

  const loginContainerBaseClasses =
    'min-h-screen flex items-center justify-center login-container bg-cover bg-center';
  const loginContainerClasses = hasLoadedAnimation
    ? `${loginContainerBaseClasses} loaded`
    : loginContainerBaseClasses;

  const backgroundStyle = {
    backgroundImage: `url(${bgImage.src})`,
  };

  const glassCardClasses =
    'max-w-md w-full p-8 shadow-2xl bg-dark-bg/80 border border-primary/20 backdrop-blur-md rounded-xl';

  const headingClasses =
    'text-3xl text-white text-center mb-8 font-orbitron';

  const signupTextClasses =
    'mt-6 text-center text-sm text-gray-300 font-roboto';

  const signupLinkClasses =
    'text-orange hover:text-red transition-colors duration-200';

  return (
    <div className={`${loginContainerClasses} bg-dark-bg`} style={backgroundStyle}>
      <div className={glassCardClasses}>
        <h2 className={headingClasses}>Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <FormInput
            id="username"
            type="text"
            label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email Address"
          />
          <FormInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <FormButton variant="blue">Log In</FormButton>
        </form>
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-primary/20" />
          <span className="mx-4 flex-shrink font-roboto text-sm text-gray-300">
            OR
          </span>
          <div className="flex-grow border-t border-primary/20" />
        </div>
        <FormButton
          type="button"
          variant="canvas-login"
          onClick={() => {
            // Simulate a successful Canvas login for now
            login('canvas_user');
            router.push('/dashboard');
          }}
          className="flex justify-center items-center"
        >
          <img
            src={canvasLogo.src}
            alt="Canvas logo"
            className="mr-2 h-5 w-5"
          />
          Log In with Canvas
        </FormButton>
        <p className={signupTextClasses}>
          Don't have an account?{' '}
          <Link href="/signup" className={signupLinkClasses}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}