"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const userId = searchParams.get("user");

    useEffect(() => {
        // Fetch user details from backend if userId exists
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:3001/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                router.push("/"); // Redirect to login if user data fails to load
            }
        };

        fetchUserData();
    }, [userId, router]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Your Role: {user.role}</p>

            <div>
                {user.role === "admin" && (
                    <div>
                        <h2>Admin Dashboard</h2>
                        <ul>
                            <li>
                                <a href="/rooms">Create Room</a>
                            </li>
                            <li>
                                <a href="/users">Search Users</a>
                            </li>
                        </ul>
                    </div>
                )}

                {user.role === "moderator" && (
                    <div>
                        <h2>Moderator Dashboard</h2>
                        <p>Join assigned rooms or manage discussions.</p>
                    </div>
                )}

                {user.role === "participant" && (
                    <div>
                        <h2>Participant Dashboard</h2>
                        <p>Join your assigned rooms to participate in discussions.</p>
                    </div>
                )}

                {user.role === "observer" && (
                    <div>
                        <h2>Observer Dashboard</h2>
                        <p>Join assigned rooms to observe discussions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
