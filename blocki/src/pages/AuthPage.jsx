// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function AuthPage(){
//     const router = useRouter();

//     dotenv.config();
//     useEffect(() => {
//         const clientId = process.env.API_KEY;
//         const clientSecret = process.env.API_SECRET;
//         const redirectUri = encodeURIComponent('http://localhost:3000/auth/');
//         const canvasDomain = 'https://dlsu.instructure.com';

//         const authUrl = `${canvasDomain}/login/oauth2/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

//         window.location.href = authUrl;
//     }, []);

//     return <p>Redirecting to Canvas...</p>;
// }
// // This page will redirect the user to the Canvas OAuth2 login page

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StepThree } from '../vendor/Oauth2'; // Adjust import path if needed

export default function AuthPage() {
    const [message, setMessage] = useState('Redirecting...');
    const router = useRouter();

    useEffect(() => {
        async function handleOAuthRedirect() {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const state = params.get('state');
            const storedState = sessionStorage.getItem('oauth2_state');

            if (!code || !state) {
                setMessage('Missing authorization code or state.');
                return;
            }

            if (state !== storedState) {
                setMessage('State mismatch. Possible CSRF attack.');
                return;
            }

            try {
                const tokenData = await StepThree(code);
                console.log('Token Data:', tokenData);

                // Save token to sessionStorage or cookies
                sessionStorage.setItem('access_token', tokenData.access_token);

                setMessage('Login successful! Redirecting...');
                router.push('/dashboard'); // or wherever your app goes after login
            } catch (error) {
                console.error(error);
                setMessage('Failed to complete login.');
            }
        }

        handleOAuthRedirect();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-xl font-semibold">{message}</h1>
        </div>
    );
}
