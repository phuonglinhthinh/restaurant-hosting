import { useCustomer } from "../CustomerContext";

function Waitlist() {
    const { waitlist, assignCustomerToTable, tables } = useCustomer();

    // Function to assign a customer to a random available table
    const handleAssign = (id) => {
        const customerToAssign = waitlist.find((customer) => customer.id === id);

        // Find all available tables
        const availableTables = tables.filter((table) => !table.customer);

        if (availableTables.length > 0) {
            // Pick a random available table
            const randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];

            // Assign customer to the random table
            const updatedTables = tables.map((table) =>
                table.tableNumber === randomTable.tableNumber
                    ? { ...table, customer: { ...customerToAssign, isAssigned: true } }
                    : table
            );

            // Remove customer from waitlist
            const updatedWaitlist = waitlist.filter((customer) => customer.id !== id);

            // Update the state
            assignCustomerToTable(updatedWaitlist, updatedTables);
        }
    };

    return (
        <div className="page">
            <table className="waitlist-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Size</th>
                        <th>Notes</th>
                        <th>Special Request</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {waitlist.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.customerName}</td>
                            <td>{customer.size}</td>
                            <td>{customer.note}</td>
                            <td>{customer.specialRequest}</td>
                            <td>{customer.time}</td>
                            <td>{customer.date}</td>
                            <td>
                                <button onClick={() => handleAssign(customer.id)}>✔️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Waitlist;
