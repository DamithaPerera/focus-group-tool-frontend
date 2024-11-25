import { createLocalVideoTrack, Room } from "livekit-client";

export async function connectToRoom(roomUrl: string, token: string): Promise<Room> {
    const room = new Room();
    await room.connect(roomUrl, token);

    // Optionally publish a video track
    const videoTrack = await createLocalVideoTrack();
    await room.localParticipant.publishTrack(videoTrack);

    return room;
}
