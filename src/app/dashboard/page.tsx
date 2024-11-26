'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Room type with id as number
interface Room {
    id: number;  // Change id type to number
    name: string;
}

export default function Dashboard() {
    const [rooms, setRooms] = useState<Room[]>([]); // Type rooms as an array of Room
    const [roomName, setRoomName] = useState('');
    const [adminId, setAdminId] = useState('');

    useEffect(() => {
        const fetchAdminId = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}auth/me`);
            setAdminId(response.data.id);
        };

        fetchAdminId();
    }, []);

    const createRoom = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}rooms`, { name: roomName, adminId });

            // Assuming the response data has the same shape as Room
            const newRoom: Room = response.data;

            // Update the state with the new room
            setRooms((prevRooms) => [...prevRooms, newRoom]);
            setRoomName('');
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}rooms`);
            setRooms(response.data);
        };

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
                    <li key={room.id}>{room.name}</li>
                ))}
            </ul>
        </div>
    );
}