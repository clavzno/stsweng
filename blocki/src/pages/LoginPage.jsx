"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormButton from '../components/FormButton';
import bgImage from '../assets/images/background.png';
import canvasLogo from '../assets/images/canvas_logo.png';
import logoSingle from '../assets/images/logo_single.png';

// auth2
import { signIn } from "next-auth/react"

export default async function LoginPage() {
  //test, + added async above
  const session = await auth()
  console.log('LoginPage: ', session?.accessToken)

  const [hasLoadedAnimation, setHasLoadedAnimation] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHasLoadedAnimation(true);
  }, []);

  const loginContainerBaseClasses =
    'min-h-screen flex items-center justify-center login-container bg-cover bg-center relative overflow-hidden px-4';
  const loginContainerClasses = hasLoadedAnimation
    ? `${loginContainerBaseClasses} loaded`
    : loginContainerBaseClasses;

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
    text-3xl text-white text-center mb-2 font-orbitron font-bold
    bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent
    transition-all duration-300 ease-out
  `;

  const subheadingClasses = `
    text-base text-primary/80 text-center mb-6 font-orbitron font-light tracking-wide
  `;

  const encouragementTextClasses = `
    text-center text-gray-200/90 mb-8 font-roboto leading-relaxed text-sm
    transition-all duration-300 ease-out
  `;

  return (
    <div className={`${loginContainerClasses} bg-dark-bg`} style={backgroundStyle}>
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
        <div className="text-center mb-4">
          <img
            src={logoSingle.src}
            alt="Blocki Logo"
            className={`mx-auto h-20 w-20 object-contain mb-3 transition-all duration-1000 ease-out
              ${hasLoadedAnimation
                ? 'opacity-100 translate-y-0 rotate-0'
                : 'opacity-0 -translate-y-12 rotate-12'
              }
              hover:scale-110 hover:rotate-6 cursor-pointer filter drop-shadow-lg
            `}
          />
        </div>

        {/* Heading */}
        <h1 className={headingClasses}>Welcome to Blocki.</h1>
        <h2 className={subheadingClasses}>All-in-one productivity tool.</h2>

        {/* Description */}
        <p className={encouragementTextClasses}>
          Transform your academic workflow with Canvas integration. 
          Connect once, access everything!
        </p>

        {/* Login button */}
        <div className="space-y-4">
          <FormButton
            type="button"
            variant="canvas-login"
            onClick={() => {
              /**
               * Direct redirect to dashboard
               * router.push('/dashboard');
               */
              signIn('dlsuinstructure', {redirectTo: '/dashboard'})
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`
              flex justify-center items-center w-full py-3 px-6 text-base font-semibold
              transition-all duration-300 ease-out transform
              hover:scale-105 hover:shadow-xl hover:shadow-primary/25
              focus:scale-105 focus:shadow-xl focus:shadow-primary/25
              active:scale-95
            `}
          >
            <img
              src={canvasLogo.src}
              alt="Canvas logo"
              className={`mr-3 h-5 w-5 transition-transform duration-300 ${
                isHovering ? 'scale-110 rotate-12' : ''
              }`}
            />
            Log In with Canvas
            <span className={`ml-2 transition-transform duration-300 ${
              isHovering ? 'translate-x-1' : ''
            }`}>
              →
            </span>
          </FormButton>

          {/* For users who dont have access to Canvas */}
          <div className="text-center pt-2">
            <p className="text-gray-400 text-xs mb-1">
              Don't have Canvas access?
            </p>
            <Link 
              href="/dashboard" 
              className="text-primary hover:text-primary/80 text-xs underline transition-colors duration-200"
            >
              Try the Demo Version
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}