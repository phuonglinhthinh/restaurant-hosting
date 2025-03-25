import { useState } from "react";
import { useCustomer } from "../CustomerContext";

function Waitlist() {
    const { waitlist, assignCustomerToTable, tables } = useCustomer();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        customerName: "",
        size: "",
        tablePreference: "",
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
            tablePreference: "",
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
                        <th>Table Preference</th>
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
                            <td>{customer.tablePreference}</td>
                            <td>{customer.specialRequest}</td>
                            <td>{customer.time}</td>
                            <td>{customer.date}</td>
                            <td>
                                <button onClick={() => handleAssign(customer.id)}>✔ Assign to table</button>
                                <button onClick={() => handleCancel(customer.id)}>✘ Cancel</button>
                                <button onClick={() => handleEdit(customer.id)}>✎ Edit</button>
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
                                <p>Customer's Name:</p>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={editCustomer.customerName}
                                    onChange={handleInputChange}
                                    size="40"
                                    placeholder="Jane Smith"
                                />
                            </label>
                            <label>
                                <p>Party Size:</p>
                                <select
                                    name="size"
                                    value={editCustomer.size}
                                    onChange={handleInputChange}
                                >
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="4">4 people</option>
                                    <option value="6">6 people</option>
                                </select>
                            </label>
                            <label>
                                <p>Table Preference (Outside/Inside/Window):</p>
                                <select
                                    name="tablePreference"
                                    value={editCustomer.tablePreference}
                                    onChange={handleInputChange}
                                >
                                    <option value="no prefernce">No Preference</option>
                                    <option value="outside">Outside</option>
                                    <option value="inside">Inside</option>
                                    <option value="window">Window</option>
                                </select>
                            </label>
                            <label>
                                <p>Special Request</p>
                                <input
                                    type="text"
                                    name="specialRequest"
                                    value={editCustomer.specialRequest}
                                    onChange={handleInputChange}
                                    placeholder="birthday, ceremony, wheelchair, etc"
                                    size="40"
                                />
                            </label>
                            <label>
                                <p>Time:</p>
                                <input
                                    type="time"
                                    name="time"
                                    value={editCustomer.time}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                <p>Date:</p>
                                <input
                                    type="date"
                                    name="date"
                                    value={editCustomer.date}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button className="custom-button" type="button" onClick={handleSaveEdit}>
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
                                <p>Customer's Name:</p>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={newCustomer.customerName}
                                    onChange={handleAddInputChange}
                                    size="40"
                                    placeholder="Jane Smith"
                                />
                            </label>
                            <label>
                                <p>Party Size:</p>
                                <select
                                    name="size"
                                    value={editCustomer.size}
                                    onChange={handleInputChange}
                                >
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="4">4 people</option>
                                    <option value="6">6 people</option>
                                </select>
                            </label>
                            <label>
                                <p>Table Preference (Outside/Inside/Window):</p>
                                <select
                                    name="tablePreference"
                                    value={editCustomer.tablePreference}
                                    onChange={handleInputChange}
                                >
                                    <option value="no prefernce">No Preference</option>
                                    <option value="outside">Outside</option>
                                    <option value="inside">Inside</option>
                                    <option value="window">Window</option>
                                </select>
                            </label>
                            <label>
                                <p>Special Request:</p>
                                <input
                                    type="text"
                                    name="specialRequest"
                                    value={newCustomer.specialRequest}
                                    onChange={handleAddInputChange}
                                    placeholder="birthday, ceremony, wheelchair, etc"
                                    size="40"
                                />
                            </label>
                            <label>
                                <p>Time:</p>
                                <input
                                    type="time"
                                    name="time"
                                    value={newCustomer.time}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <label>
                                <p>Date:</p>
                                <input
                                    type="date"
                                    name="date"
                                    value={newCustomer.date}
                                    onChange={handleAddInputChange}
                                />
                            </label>
                            <button className="custom-button" type="button" onClick={handleAddNewCustomer}>
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
            <button className="custom-button" onClick={() => setIsAddModalOpen(true)}>+ Add New Customer</button>
        </div>
    );
}

export default Waitlist;
