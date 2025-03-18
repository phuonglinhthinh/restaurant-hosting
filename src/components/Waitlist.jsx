import { useState } from "react"; 
import { useCustomer } from "../CustomerContext";

function Waitlist() {
    const { waitlist, assignCustomerToTable, tables } = useCustomer();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        customerName: "",
        size: "",
        time: "",
        specialRequest: "",
    });
    const handleAssign = (id) => {
        const customerToAssign = waitlist.find((customer) => customer.id === id);

        const availableTables = tables.filter((table) => !table.customer);
        if (availableTables.length > 0) {
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

    // Handle canceling the customer from the waitlist
    const handleCancel = (id) => {
        const updatedWaitlist = waitlist.filter((customer) => customer.id !== id);
        assignCustomerToTable(updatedWaitlist, tables); // Update waitlist
    };

    // Handle editing the customer information
    const handleEdit = (id) => {
        const customerToEdit = waitlist.find((customer) => customer.id === id);
        setEditCustomer(customerToEdit);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        const updatedWaitlist = waitlist.map((customer) =>
            customer.id === editCustomer.id ? editCustomer : customer
        );
        assignCustomerToTable(updatedWaitlist, tables);
        setIsEditModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer({ ...editCustomer, [name]: value });
    };
    // Handle adding a new customer
    const handleAddNewCustomer = () => {
        const newId = waitlist.length + 1; // Create a unique ID for the new customer
        const newCustomerData = { ...newCustomer, id: newId, isAssigned: false };

        const updatedWaitlist = [...waitlist, newCustomerData];
        setNewCustomer({
            customerName: "",
            size: "",
            time: "",
            specialRequest: "",
        }); // Reset the form fields
        setIsAddModalOpen(false);
        assignCustomerToTable(updatedWaitlist, tables); // Update the waitlist with the new customer
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
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
                                <button onClick={() => handleCancel(customer.id)}>❌ Cancel</button>
                                <button onClick={() => handleEdit(customer.id)}>✏️ Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Customer Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsEditModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Edit Customer Information</h3>
                        <form>
                            <label>
                                Customer's Name:
                                <input
                                    type="text"
                                    name="customerName"
                                    value={editCustomer.customerName}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Party Size:
                                <input
                                    type="number"
                                    name="size"
                                    value={editCustomer.size}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Special Request (Outside/Inside):
                                <input
                                    type="text"
                                    name="specialRequest"
                                    value={editCustomer.specialRequest}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    name="time"
                                    value={editCustomer.time}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    value={editCustomer.date}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button type="button" onClick={handleSaveEdit}>
                                Save Changes
                            </button>
                            <button type="button" onClick={() => setIsEditModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Add New Customer Modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsAddModalOpen(false)}>
                            &times;
                        </span>
                        <h3>Add New Customer</h3>
                        <form>
                            <label>
                                Customer's Name:
                                <input
                                    type="text"
                                    name="customerName"
                                    value={newCustomer.customerName}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Party Size:
                                <input
                                    type="number"
                                    name="size"
                                    value={newCustomer.size}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Special Request (Outside/Inside):
                                <input
                                    type="text"
                                    name="specialRequest"
                                    value={newCustomer.specialRequest}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Time:
                                <input
                                    type="time"
                                    name="time"
                                    value={newCustomer.time}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    value={newCustomer.date}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <button type="button" onClick={handleAddNewCustomer}>
                                Add Customer
                            </button>
                            <button type="button" onClick={() => setIsAddModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add New Customer Button */}
            <button onClick={() => setIsAddModalOpen(true)}>+ Add New Customer</button>
        </div>
    );
}

export default Waitlist;
