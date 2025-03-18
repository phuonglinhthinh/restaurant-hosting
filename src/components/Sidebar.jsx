function Sidebar({ setCurrentPage }) {
    return (
        <div className="sidebar">
            <img src="/assets/img/avatar.svg" alt="logo" />
            <nav>
                <ul>
                    <li onClick={() => setCurrentPage("Dashboard")}>Dashboard</li>
                    <li onClick={() => setCurrentPage("Reservations")}>Reservations</li>
                    <li onClick={() => setCurrentPage("Waitlist")}>Waitlist</li>
                    <li onClick={() => setCurrentPage("Orders")}>Orders</li>
                    <li onClick={() => setCurrentPage("Menu")}>Menu</li>
                    <li onClick={() => setCurrentPage("Archive")}>Archive</li>
                    <li onClick={() => setCurrentPage("Settings")}>Settings</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
