"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormButton from '../components/FormButton';
import bgImage from '../assets/images/background.png';
import logoSingle from '../assets/images/logo_single.png';
import { IoWarning } from 'react-icons/io5';

import { signIn } from 'next-auth/react'; //manual authentication

export default function AuthKeyPage() {
  const [hasLoadedAnimation, setHasLoadedAnimation] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHasLoadedAnimation(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!authKey.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    //setTimeout(() => {
    //  setIsSubmitting(false);
    //  router.push('/dashboard');
    //}, 1000)
    const res = await signIn("manualtoken", {
      accessToken: authKey,
      redirect: false,
    });

    setIsSubmitting(false);
    if (!res?.ok) {
      // UI error
      return;
    }

    router.push('/dashboard');
};

  const containerBaseClasses =
    'min-h-screen flex items-center justify-center login-container bg-cover bg-center relative overflow-hidden px-4';
  const containerClasses = hasLoadedAnimation
    ? `${containerBaseClasses} loaded`
    : containerBaseClasses;

  const backgroundStyle = {
    backgroundImage: `url(${bgImage.src})`,
  };

  const glassCardClasses = `
    max-w-md w-full p-8 shadow-2xl bg-dark-bg/85 border border-primary/30 
    backdrop-blur-lg rounded-2xl relative z-10 transition-all duration-500 ease-out
    hover:bg-dark-bg/90 hover:border-primary/40 hover:shadow-3xl hover:scale-[1.02]
    ${hasLoadedAnimation ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}
  `;

  const headingClasses = `
    text-2xl text-white text-center mb-2 font-orbitron font-bold
    bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent
    transition-all duration-300 ease-out
  `;

  const warningClasses = `
    text-center text-red-300 mb-4 font-roboto text-xs leading-relaxed
    bg-red-500/10 border border-red-500/30 rounded-lg p-3
    transition-all duration-300 ease-out
  `;

  const inputClasses = `
    w-full px-4 py-3 bg-dark-bg/50 border border-primary/30 rounded-lg
    text-white placeholder-gray-400 font-roboto text-sm
    focus:outline-none focus:border-primary/60 focus:bg-dark-bg/70
    transition-all duration-300 ease-out
    backdrop-blur-sm
  `;

  return (
    <div className={`${containerClasses} bg-dark-bg`} style={backgroundStyle}>

      {/* Dark overlay matching landing page */}
      <div className="fixed inset-0 bg-dark-bg/60 z-0"></div>
      
      {/* Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className={glassCardClasses}>
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={logoSingle.src}
            alt="Blocki Logo"
            className={`mx-auto h-16 w-16 object-contain mb-3 transition-all duration-1000 ease-out
              ${hasLoadedAnimation
                ? 'opacity-100 translate-y-0 rotate-0'
                : 'opacity-0 -translate-y-12 rotate-12'
              }
              hover:scale-110 hover:rotate-6 cursor-pointer filter drop-shadow-lg
            `}
          />
        </div>

        {/* Heading */}
        <h1 className={headingClasses}>Authentication Key:</h1>

        {/* Warning */}
        <div className={warningClasses}>
            <div className="flex items-center justify-center">
                <IoWarning className="h-5 w-5 mr-2 shrink-0" aria-hidden="true" />
                <p>
                    Warning: This method is against the{' '}
                    <a
                        href="https://www.instructure.com/policies/canvas-api-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-200 underline transition-colors duration-200"
                    >
                        Canvas LMS policy
                    </a>.
                </p>
            </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="authKey" className="block text-sm font-medium text-gray-300 mb-2 font-orbitron">
              Enter your Canvas API Key
            </label>
            <input
              type="password"
              id="authKey"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              placeholder="Enter your authentication key..."
              className={inputClasses}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Submit button */}
          <FormButton
            type="submit"
            variant="primary"
            disabled={!authKey.trim() || isSubmitting}
            className={`
              flex justify-center items-center w-full py-3 px-6 text-base font-semibold
              transition-all duration-300 ease-out transform
              hover:scale-105 hover:shadow-xl hover:shadow-primary/25
              focus:scale-105 focus:shadow-xl focus:shadow-primary/25
              active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            `}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                Connect to Dashboard
                <span className="ml-2">→</span>
              </>
            )}
          </FormButton>
        </form>

        {/* Back to login */}
        <div className="text-center pt-4 border-t border-primary/20 mt-6">
          <Link 
            href="/login" 
            className="text-primary hover:text-primary/80 text-sm underline transition-colors duration-200"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}