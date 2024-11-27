// src/app/page.tsx
"use client";  // Mark this as a client component

import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthButton from "./components/GoogleAuthButton";  // Import the provider

const HomePage = () => {
    const handleLoginSuccess = (response: any) => {
        console.log('Login Success:', response);
    };

    const handleLoginFailure = (error: any) => {
        console.error('Login Failure:', error);
    };

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <div>
                <h1>Welcome to Focus Group Tool</h1>
                <GoogleAuthButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default HomePage;
