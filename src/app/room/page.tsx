'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Assuming you have supabaseClient configured

export default function Room() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // If no user is authenticated, redirect to the login page
                router.push('/login');
            } else {
                setUser(user);
            }
        };

        fetchUser();
    }, [router]);

    const handleLeaveRoom = () => {
        // Handle the logic to leave the room (e.g., end session or disconnect)
        supabase.auth.signOut();
        router.push('/login'); // Redirect to login page after signing out
    };

    if (!user) {
        return <div>Loading...</div>; // Show loading while fetching user
    }

    return (
        <div>
            <h1>Welcome to the Room</h1>
            <p>You are logged in as {user.email}</p>
            <button onClick={handleLeaveRoom}>Leave Room</button>
        </div>
    );
}
