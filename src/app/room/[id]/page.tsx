'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Assuming you have supabaseClient configured
import { useRouter } from 'next/navigation';

// Define the session type
interface Session {
    access_token: string;
    refresh_token: string;
}

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        console.log('innn')
        // Check if the URL contains OAuth tokens in the hash
        const handleAuthCallback = async () => {
            console.log('window.location', window.location)
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
            // Redirect based on the user's role
            const role = user.user_metadata.role || 'participant';
            if (role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/room');
            }
        }
    };

    const handleGoogleLogin = async () => {
        console.log('window.location.origin', window.location.origin)
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/login`, // Make sure this URL matches your expected redirect in your .env or config
            },
        });

        if (error) {
            console.error('Login failed:', error.message);
            return;
        }

        // Check if the data contains session information
        if (data && 'session' in data) {
            // Type assertion: data.session is of type 'Session'
            const session = data.session as Session;
            console.log('OAuth success:', session);  // Debug log to check the returned session

            await supabase.auth.setSession({
                access_token: session.access_token,
                refresh_token: session.refresh_token,
            });

            await fetchUserAndRedirect();
        } else {
            console.log('OAuth login started, waiting for user to authenticate');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}
