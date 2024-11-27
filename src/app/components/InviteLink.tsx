// src/app/components/InviteLink.tsx
import { useState } from 'react';
import axios from 'axios';

const InviteLink = ({ roomId }: { roomId: number }) => {
    const [role, setRole] = useState('participant');
    const [identity, setIdentity] = useState('');
    const [link, setLink] = useState('');

    const handleGenerateLink = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/rooms/${roomId}/invite`, {
                role,
                identity,
            });
            setLink(response.data.inviteLink);
        } catch (error) {
            alert('Error generating invite link');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="Enter Participant Identity"
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="participant">Participant</option>
                <option value="moderator">Moderator</option>
                <option value="observer">Observer</option>
            </select>
            <button onClick={handleGenerateLink}>Generate Invite Link</button>
            {link && <div>Invite Link: <a href={link}>{link}</a></div>}
        </div>
    );
};

export default InviteLink;
