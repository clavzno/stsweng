import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import bgImage from '../assets/images/background.png';

/**
 * LoginPage component
 */
export default function LoginPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoadedAnimation, setHasLoadedAnimation] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setHasLoadedAnimation(true);
  }, []);

  /**
   * Handles form submission
   */
  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter a username and password.');
      return;
    }

    login(username);
    navigate('/dashboard');
  };

  const loginContainerBaseClasses =
    'min-h-screen flex items-center justify-center login-container bg-cover bg-center';
  const loginContainerClasses = hasLoadedAnimation
    ? `${loginContainerBaseClasses} loaded`
    : loginContainerBaseClasses;

  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundColor: '#0D122C',
  };

  const glassCardClasses =
    'max-w-md w-full p-8 shadow-2xl bg-[#0D122C]/80 border border-[#526CF4]/20 backdrop-blur-md rounded-xl';

  const headingClasses =
    'text-3xl text-white text-center mb-8 orbitron';

  const signupTextClasses =
    'mt-6 text-center text-sm text-gray-300 roboto';

  const signupLinkClasses =
    'text-[#F38735] hover:text-[#FF5757] transition-colors duration-200';

  // for fonts and animation
  const loginStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto:wght@400;500&display=swap');

    .login-container {
      opacity: 1;
      transform: translateY(-30px);
      transition: all 0.8s ease-out;
    }

    .login-container.loaded {
      opacity: 1;
      transform: translateY(0);
    }

    .orbitron {
      font-family: 'Orbitron', monospace;
      font-weight: 600;
    }

    .roboto {
      font-family: 'Roboto', sans-serif;
    }
  `;

  return (
    <>
      {/* Embedded font imports and animation styles */}
      <style>{loginStyles}</style>

      {/* Main Container with dynamic "loaded" class */}
      <div className={loginContainerClasses} style={backgroundStyle}>
        {/* Glassmorphic Login Card */}
        <div className={glassCardClasses}>
          <h2 className={headingClasses}>Login</h2>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <FormInput
              id="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. aza_velasquez"
            />

            <FormInput
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <FormButton variant="blue">Log In</FormButton>
          </form>

          <p className={signupTextClasses}>
            Don't have an account?{' '}
            <Link to="/signup" className={signupLinkClasses}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
