'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import LiveKitVideo from './LiveKitVideo';
import { User } from '@supabase/supabase-js';  // Import the type for User

export default function Room() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);  // Declare the user state type correctly

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // If no user is authenticated, redirect to the login page
                router.push('/login');
            } else {
                setUser(user);  // Correctly set the user state
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

            {/* Display LiveKit video component */}
            <LiveKitVideo />
        </div>
    );
}
