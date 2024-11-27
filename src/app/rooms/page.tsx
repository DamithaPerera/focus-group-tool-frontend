'use client';

import React, { useState } from 'react';
import axios from 'axios';

const CreateRoomPage = () => {
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [roomLink, setRoomLink] = useState('');

    const handleCreateRoom = async () => {
        if (!roomName) {
            setError('Room name is required');
            return;
        }

        setLoading(true);
        try {
            // Send a request to the backend to create the room
            const { data } = await axios.post('http://localhost:3001/rooms', { name: roomName });

            // Generate the invite link for the room
            const roomId = data.id; // Assuming the room object contains an 'id' field
            setRoomLink(`http://localhost:3000/room/${roomId}`); // Generate link to the room
        } catch (error) {
            console.error('Error creating room:', error);
            setError('Failed to create room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create a Room</h1>
            <div>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room name"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleCreateRoom} disabled={loading}>
                {loading ? 'Creating...' : 'Create Room'}
            </button>

            {roomLink && (
                <div>
                    <h2>Room Created Successfully</h2>
                    <p>Invite Link for Participants: <a href={roomLink} target="_blank" rel="noopener noreferrer">{roomLink}</a></p>
                </div>
            )}
        </div>
    );
};

export default CreateRoomPage;
