// src/app/components/RoomPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const RoomPage = ({ roomId }: { roomId: number }) => {
    const [participants, setParticipants] = useState<any[]>([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            const response = await axios.get(`http://localhost:3001/rooms/${roomId}/participants`);
            setParticipants(response.data);
        };
        fetchParticipants();
    }, [roomId]);

    const handleMute = async (identity: string) => {
        await axios.post(`http://localhost:3001/rooms/${roomId}/mute`, { identity });
        setParticipants((prev) =>
            prev.map((p) => (p.identity === identity ? { ...p, muted: true } : p)),
        );
    };

    const handleUnmute = async (identity: string) => {
        await axios.post(`http://localhost:3001/rooms/${roomId}/unmute`, { identity });
        setParticipants((prev) =>
            prev.map((p) => (p.identity === identity ? { ...p, muted: false } : p)),
        );
    };

    const handleRemove = async (identity: string) => {
        await axios.post(`http://localhost:3001/rooms/${roomId}/remove`, { identity });
        setParticipants((prev) => prev.filter((p) => p.identity !== identity));
    };

    return (
        <div>
            <h1>Room: {roomId}</h1>
            <div>
                <h2>Participants</h2>
                <ul>
                    {participants.map((participant) => (
                        <li key={participant.identity}>
                            {participant.identity} {participant.muted ? '(Muted)' : ''}
                            <button onClick={() => handleMute(participant.identity)}>Mute</button>
                            <button onClick={() => handleUnmute(participant.identity)}>Unmute</button>
                            <button onClick={() => handleRemove(participant.identity)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomPage;
