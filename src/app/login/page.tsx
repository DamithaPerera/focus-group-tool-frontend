'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Assuming you have supabaseClient configured
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        // Handle the OAuth callback from Supabase
        const handleAuthCallback = async () => {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1); // Strip out the '#'
                const params = new URLSearchParams(hash);

                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');

                if (accessToken && refreshToken) {
                    // Set session using the tokens
                    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });

                    // After setting the session, fetch the user and redirect
                    await fetchUserAndRedirect();
                }
            }
        };

        handleAuthCallback();
    }, []); // Empty dependency array to run once when the component mounts

    const fetchUserAndRedirect = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            return;
        }

        if (user) {
            const role = user.user_metadata.role || 'participant'; // Handle user role
            if (role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/room');
            }
        }
    };

    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/login`, // Make sure this matches the redirect URL
            },
        });

        if (error) {
            console.error('Login failed:', error.message);
            return;
        }

        // If login is successful, check the session and user role
        if (data) {
            console.log('OAuth success:', data);  // Debug log to check the returned data

            // Accessing the session properly from the data object
            // const { session } = data;
            //
            // if (session) {
            //     // Set session after successful login
            //     await supabase.auth.setSession({
            //         access_token: session.access_token,
            //         refresh_token: session.refresh_token,
            //     });
            //
            //     // Fetch user and redirect based on role
            //     await fetchUserAndRedirect();
            // } else {
            //     console.error('Session is not available');
            // }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}
