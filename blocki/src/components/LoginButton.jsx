'use client';

import { useState } from 'react';
import { CreateStateKey } from '@/vendor/Oauth2'; // Adjust path if needed
import canvasLogo from '../assets/images/canvas_logo.png'; // Adjust if necessary
import FormButton from '@/components/FormButton'; // Your custom button component

export default function LoginButton() {
    const [isHovering, setIsHovering] = useState(false);

    async function handleCanvasLogin() {
        const state = await CreateStateKey();

        const clientId = process.env.API_KEY;
        const redirectUri = encodeURIComponent('https://blocki.vercel.app/auth/');
        const scope = encodeURIComponent('url:GET|/api/v1/users/self') //can be changed
        const canvasDomain = process.env.DOMAIN;

        const authUrl = `${canvasDomain}/login/oauth2/auth` +
        `?client_id=${clientId}` +
        `&response_type=code` +
        `&state=${state}` +
        `&redirect_uri=${redirectUri}` +
        `&scope=${scope}`;

        window.location.href = authUrl;
    }

    return (
        <FormButton
            type="button"
            variant="canvas-login"
            onClick={handleCanvasLogin}
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
            className={`mr-3 h-5 w-5 transition-transform duration-300 ${isHovering ? 'scale-110 rotate-12' : ''}`}
            />
            Log In with Canvas
            <span className={`ml-2 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`}>
            →
            </span>
        </FormButton>
    );
}
