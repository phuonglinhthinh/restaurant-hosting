import { useCustomer } from '../CustomerContext'; // Adjust the import path as needed

function Dashboard() {
    const { waitlist, tables } = useCustomer();

    const confirmedReservations = waitlist.filter((customer) => customer.isAssigned).length;
    const pendingReservations = waitlist.filter((customer) => !customer.isAssigned).length;

    const availableTables = tables.filter((table) => table.customer === null).length;
    const occupiedTables = tables.filter((table) => table.customer !== null).length;
    const reservedTables = tables.filter((table) => table.customer && table.customer.isAssigned).length;

    return (
        <div className="page">
            <h2>Hello, welcome back!</h2>
            <div className="dashboard-content">
                <div className="reservations">
                    <h3>Reservations</h3>
                    <p>Confirmed: {confirmedReservations}</p>
                    <p>Pending: {pendingReservations}</p>
                </div>
                <div className="table__occupation">
                    <h3>Table Occupation</h3>
                    <p>Available: {availableTables}</p>
                    <p>Occupied: {occupiedTables}</p>
                    <p>Reserved: {reservedTables}</p>
                </div>
                <div className="waitlist">
                    <h3>Next in the waitlist</h3>
                    {waitlist.map((customer) => (
                        <p key={customer.id}>
                            {customer.customerName}, at {customer.time}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
