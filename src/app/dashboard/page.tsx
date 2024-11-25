'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [inviteLinks, setInviteLinks] = useState([]);

    const fetchRooms = async () => {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
    };

    const createRoom = async () => {
        const response = await axios.post('/api/rooms', { name: roomName });
        setRooms([...rooms, response.data]);
    };

    const generateInviteLink = async (roomId: string, role: string) => {
        const response = await axios.post(`/api/rooms/${roomId}/invite`, { role });
        setInviteLinks([...inviteLinks, response.data]);
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button onClick={createRoom}>Create Room</button>

            <h2>Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        {room.name}
                        <button onClick={() => generateInviteLink(room.id, 'moderator')}>Invite Moderator</button>
                        <button onClick={() => generateInviteLink(room.id, 'participant')}>Invite Participant</button>
                        <button onClick={() => generateInviteLink(room.id, 'observer')}>Invite Observer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
