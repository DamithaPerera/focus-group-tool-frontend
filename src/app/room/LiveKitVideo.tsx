'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LiveKitRoom, useRoom } from 'livekit-react';
import {supabase} from "../../lib/supabaseClient";

const LiveKitVideo = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [roomUrl, setRoomUrl] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError('User is not authenticated.');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}rooms/join?userId=${user.id}`, { method: 'GET' });
        const data = await response.json();

        if (data.error) {
          setError('Error joining room: ' + data.error);
          return;
        }

        const { roomUrl, token } = data;
        setRoomUrl(roomUrl);
        setToken(token);
      } catch (error) {
        console.error('Error fetching room data:', error);
        setError('Failed to join room');
      }
    };

    joinRoom();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!roomUrl || !token) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <h2>Room Participants</h2>
        {/* Use LiveKitRoom and handle errors with the useRoom hook */}
        <LiveKitRoom
            url={roomUrl}
            token={token}
        />
      </div>
  );
};

export default LiveKitVideo;
