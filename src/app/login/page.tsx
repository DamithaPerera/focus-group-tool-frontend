'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Assuming supabaseClient is configured
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);

                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');

                if (accessToken && refreshToken) {
                    await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });

                    await fetchUserAndRedirect();
                }
            }
        };

        handleAuthCallback();
    }, []);

    const fetchUserAndRedirect = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
            return;
        }

        if (user) {
            const role = user.user_metadata?.role || 'participant';
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
                redirectTo: `${window.location.origin}/login`,
            },
        });

        if (error) {
            console.error('Login failed:', error.message);
            return;
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}
