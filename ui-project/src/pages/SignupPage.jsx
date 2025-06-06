import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import bgImage from '../assets/images/background.png';

/**
 * SignupPage
 */
export default function SignupPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles form submission:
   */
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
    navigate('/dashboard');
  };

  // CSS class constants
  const containerClasses = 'min-h-screen flex items-center justify-center bg-cover bg-center';
  const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundColor: '#0D122C',
  };
  const cardClasses =
    'max-w-md w-full p-8 bg-[#0D122C]/80 border border-[#526CF4]/20 backdrop-blur-md rounded-xl shadow-2xl';
  const headingClasses = 'text-3xl text-white text-center mb-6 orbitron';
  const footerTextClasses = 'mt-6 text-center text-sm text-gray-300 roboto';
  const footerLinkClasses = 'text-[#F38735] hover:text-[#FF5757] transition-colors duration-200';

  // Font imports
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600&family=Roboto:wght@400;500&display=swap');

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
      {/* Import Orbitron & Roboto fonts */}
      <style>{fontStyles}</style>

      {/* Main container with background image */}
      <div className={containerClasses} style={backgroundStyle}>
        {/* Glassmorphic signup card */}
        <div className={cardClasses}>
          <h2 className={headingClasses}>Sign Up</h2>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <FormInput
              id="signup-username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. aza_velasquez"
            />

            <FormInput
              id="signup-password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <FormInput
              id="signup-confirm-password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />

            <FormButton variant="green">Create Account</FormButton>
          </form>

          <p className={footerTextClasses}>
            Already have an account?{' '}
            <Link to="/login" className={footerLinkClasses}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
