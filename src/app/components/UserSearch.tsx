"use client"

// src/app/components/UserSearch.tsx
import { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const handleSearch = async () => {
        if (!email) {
            setError('Please enter an email to search.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/users/${email}`);
            setUser(response.data);
            setError('');
        } catch (err) {
            setError('User not found or error fetching user data.');
            setUser(null);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {user && (
                <div>
                    <h3>User Details:</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                </div>
            )}
        </div>
    );
};

export default UserSearch;
