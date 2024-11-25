'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const user = supabase.auth.user();
            if (user) {
                // After login, redirect based on role
                const { data: roles } = await supabase
                    .from('users')
                    .select('role')
                    .eq('email', user.email)
                    .single();

                // Redirect to appropriate page based on role
                if (roles?.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push(`/room`);
                }
            }
        };
        checkSession();
    }, []);

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Login failed:', error);
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}
