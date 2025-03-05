function Dashboard() {
    return (
        <div className="page">
            <h2>Good morning, Linh</h2>
            <div className="dashboard-content">
                <div className="reservations">
                    <h3>Current reservations</h3>
                    <img src="your-chart-placeholder.png" alt="Reservations Chart" />
                </div>
                <div className="orders">
                    <h3>Current orders</h3>
                </div>
                <div className="popular-dishes">
                    <h3>Popular dishes ordered today</h3>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

