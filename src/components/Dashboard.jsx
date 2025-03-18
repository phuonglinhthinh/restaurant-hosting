function Dashboard() {
    return (
        <div className="page">
            <h2>Hello Linh, welcome back!</h2>
            <div className="dashboard-content">
                <div className="reservations">
                    <h3>Reservations</h3>
                    <p>10 Confirmed</p>
                    <p>10 Pending</p>
                    <p>10 Seat</p>
                </div>
                <div className="orders">
                    <h3>Table Occupation</h3>
                    <p>10 Available</p>
                    <p>10 Occupied</p>
                    <p>10 Reserved</p>
                </div>
                <div className="popular-dishes">
                    <h3>Next in the waitlist</h3>
                    <p>Anna Gtierre, at 14:00</p>
                    <p>Diana, at 13:00</p>
                    <p>Linh Thinh, at 13:00</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

