import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const invite = searchParams.get("invite");

    if (!invite) {
        return NextResponse.json({ error: "Missing invite token" }, { status: 400 });
    }

    const roomId = "example-room";
    const role = "participant";

    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_SECRET_KEY!,
        { identity: `user-${Date.now()}` }
    );
    at.addGrant({
        roomJoin: true,
        room: roomId,
        canPublish: role !== "observer",
        canSubscribe: true,
    });

    return NextResponse.json({ token: at.toJwt() });
}
