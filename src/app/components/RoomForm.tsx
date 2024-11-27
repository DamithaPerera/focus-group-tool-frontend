// src/app/components/RoomForm.tsx
import { useState } from 'react';
import axios from 'axios';

const RoomForm = () => {
    const [roomName, setRoomName] = useState('');

    const handleCreateRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/rooms', { name: roomName });
            alert(`Room created: ${response.data.name}`);
        } catch (error) {
            alert('Error creating room');
        }
    };

    return (
        <form onSubmit={handleCreateRoom}>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter Room Name"
                required
            />
            <button type="submit">Create Room</button>
        </form>
    );
};

export default RoomForm;
