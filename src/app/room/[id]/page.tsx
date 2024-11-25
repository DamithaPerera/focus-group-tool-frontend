'use client';

import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles"; // LiveKit styles
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Room({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const response = await fetch(
                `/api/rooms/token?room=${roomId}&identity=user-${Date.now()}&role=${userRole}`
            );
            const data = await response.json();
            setToken(data.token);
            setServerUrl(data.serverUrl);
        };

        fetchToken();
    }, [roomId, userRole]);


    if (!token) return <p>Loading...</p>;

    return (
        <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL!}
            token={token}
        >
            <VideoConference />
        </LiveKitRoom>
    );
}
