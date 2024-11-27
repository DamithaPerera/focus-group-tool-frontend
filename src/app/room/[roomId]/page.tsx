"use client"

import { useParams } from 'next/navigation';
import RoomPage from "../../components/RoomPage";

const Room = () => {
    const { roomId } = useParams();  // Get roomId from the URL

    if (!roomId || Array.isArray(roomId)) return <div>Loading...</div>;  // Handle case where roomId is an array

    return <RoomPage roomId={parseInt(roomId)} />;
};

export default Room;
