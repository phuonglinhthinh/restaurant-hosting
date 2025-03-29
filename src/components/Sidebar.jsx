function Sidebar({ setCurrentPage }) {
    return (
        <div className="sidebar">
            <img src="/assets/img/avatar.svg" alt="logo" />
            <nav>
                <ul>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Dashboard")}>Dashboard</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Waitlist")}>Waitlist</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Table Management")}>Table Management</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Orders")}>Orders</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Menu")}>Menu</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Archive")}>Archive</li>
                    <li className="sidebar__link" onClick={() => setCurrentPage("Settings")}>Settings</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
