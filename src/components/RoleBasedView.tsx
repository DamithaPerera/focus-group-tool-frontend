export default function RoleBasedView({ role }: { role: string }) {
    switch (role) {
        case 'admin':
            return <div>Admin View</div>;
        case 'moderator':
            return <div>Moderator View</div>;
        case 'participant':
            return <div>Participant View</div>;
        case 'observer':
            return <div>Observer View</div>;
        default:
            return <div>Invalid Role</div>;
    }
}
