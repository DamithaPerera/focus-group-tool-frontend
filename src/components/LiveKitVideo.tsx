'use client';

import { useEffect, useState } from 'react';

// Define the type for the participant
interface Participant {
    identity: string;
}

export default function LiveKitVideo({ room }: { room: any }) {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        const updateParticipants = () => setParticipants(Array.from(room.participants.values()));
        room.on('participant-connected', updateParticipants);
        room.on('participant-disconnected', updateParticipants);
        updateParticipants();
        return () => {
            room.off('participant-connected', updateParticipants);
            room.off('participant-disconnected', updateParticipants);
        };
    }, [room]);

    return (
        <div>
            {participants.map((participant, index) => (
                <div key={index}>{participant.identity}</div>
            ))}
        </div>
    );
}
