// import "./Sidebar.css";

function Sidebar({ setCurrentPage }) {
    return (
        <div className="sidebar">
            {/* <h2>Logo</h2> */}
            <img src="/assets/img/avatar.svg" alt="logo" />
            <nav>
                <ul>
                    <li onClick={() => setCurrentPage("Dashboard")}>Dashboard</li>
                    <li onClick={() => setCurrentPage("Reservations")}>Reservations</li>
                    <li onClick={() => setCurrentPage("Waitlist")}>Waitlist</li>
                    <li onClick={() => setCurrentPage("Orders")}>Orders</li>
                    <li onClick={() => setCurrentPage("Menu")}>Menu</li>
                    <li onClick={() => setCurrentPage("Staffs")}>Staffs</li>
                    <li onClick={() => setCurrentPage("Settings")}>Settings</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
