"use client";

const GoogleAuthButton = () => {
    const handleLogin = () => {
        // Redirect the browser to the backend's Google OAuth endpoint
        window.location.href = "http://localhost:3001/auth/google";
    };

    return <button onClick={handleLogin}>Login with Google</button>;
};

export default GoogleAuthButton;
