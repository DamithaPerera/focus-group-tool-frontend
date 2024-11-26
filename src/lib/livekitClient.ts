import { Room } from 'livekit-client';

/**
 * Connect to a LiveKit room.
 * @param roomUrl - LiveKit server URL.
 * @param token - LiveKit token for authentication.
 */
export async function connectToRoom(roomUrl: string, token: string): Promise<Room> {
    const room = new Room();
    await room.connect(roomUrl, token);

    return room;
}
