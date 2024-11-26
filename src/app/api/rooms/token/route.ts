import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const invite = searchParams.get('invite');

    if (!invite) {
        return NextResponse.json({ error: 'Missing invite token' }, { status: 400 });
    }

    const roomId = 'focus-group-room';
    // Determine the role based on the invite token
    const role = invite === 'moderator' ? 'moderator' : 'participant';

    const at = new AccessToken(
        process.env.NEXT_PUBLIC_LIVEKIT_API_KEY!,
        process.env.NEXT_PUBLIC_LIVEKIT_SECRET_KEY!,
        { identity: `user-${Date.now()}` }
    );

    // Adjust permissions based on role
    at.addGrant({
        roomJoin: true,
        room: roomId,
        canPublish: role === 'moderator', // Only moderators can publish
        canSubscribe: true,
    });

    return NextResponse.json({ token: at.toJwt(), role });
}
