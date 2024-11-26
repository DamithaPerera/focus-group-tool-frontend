import { NextApiRequest, NextApiResponse } from 'next';
import { AccessToken } from 'livekit-server-sdk'; // Import only AccessToken for token generation

const LIVEKIT_URL = process.env.LIVEKIT_SERVER_URL; // Example: wss://your-livekit-server-url
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_SECRET_KEY = process.env.LIVEKIT_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query; // Assuming you are using userId to fetch a specific user room details

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // Generate the LiveKit token using the provided userId
        const token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_SECRET_KEY, {
            identity: userId.toString(), // Identity (e.g., userId)
        });

        // Add grant for room access
        token.addGrant({
            room: 'room-' + userId,  // Room name based on userId or other logic
            canPublish: true,         // Allow user to publish audio/video
            canSubscribe: true,       // Allow user to subscribe to others' streams
        });

        // The room URL (replace with your LiveKit server URL)
        const roomUrl = `${LIVEKIT_URL}/room/${'room-' + userId}`;

        // Return the room URL and token
        return res.status(200).json({
            roomUrl,
            token: token.toJwt(),  // Return the generated token
        });
    } catch (error) {
        console.error('Error generating token or room:', error);
        return res.status(500).json({ error: 'Error generating room URL or token' });
    }
}
