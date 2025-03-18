import { useState } from "react";

function Waitlist() {
    const [waitlist, setWaitlist] = useState([
        {
            id: 1,
            customerName: "Anna Gtierre",
            size: 8,
            note: "Outside",
            specialRequest: "birthday",
            time: "14:00",
            date: "18 MAR",
        },
        {
            id: 2,
            customerName: "Diana",
            size: 3,
            note: "Inside",
            specialRequest: "wheelchair",
            time: "13:00",
            date: "18 MAR",
        },
        {
            id: 3,
            customerName: "Linh Thinh",
            size: 6,
            note: "Inside",
            specialRequest: "ceremony",
            time: "13:00",
            date: "19 MAR",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        customerName: "",
        size: "",
        note: "",
        specialRequest: "",
        time: "",
        date: "",
    });

    const handleAddCustomer = () => {
        setWaitlist([
            ...waitlist,
            { ...newCustomer, id: Date.now() }, // Using timestamp as a unique ID
        ]);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        setWaitlist(waitlist.filter((item) => item.id !== id));
    };

    const handleAssign = (id) => {
        // Placeholder for when you assign a customer to a table
        console.log(`Assigning customer ${id} to a table`);
    };

    const handleEdit = (id) => {
        // Placeholder to edit customer information
        console.log(`Editing customer ${id}`);
    };

    const handleCancel = (id) => {
        setWaitlist(waitlist.filter((item) => item.id !== id));
    };

    return (
        <div className="page">
            <h2>Waitlist</h2>
            <table className="waitlist-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Size</th>
                        <th>Notes</th>
                        <th>Special Request</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Notify</th>
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
                                <button>Notify</button>
                            </td>
                            <td>
                                <button onClick={() => handleAssign(customer.id)}>✔️</button>
                                <button onClick={() => handleCancel(customer.id)}>❌</button>
                                <button onClick={() => handleEdit(customer.id)}>✏️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Customer Button */}
            <button
                className="add-customer-button"
                onClick={() => setIsModalOpen(true)}
            >
                ➕ Add Customer
            </button>

            {/* Modal for adding a new customer */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close-button"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </span>
                        <h3>Enter Customer Information</h3>
                        <form>
                            <label>
                                Customer's Name:
                                <input
                                    type="text"
                                    value={newCustomer.customerName}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, customerName: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Phone number (optional):
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, phone: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Party size:
                                <input
                                    type="number"
                                    value={newCustomer.size}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, size: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Note (Outside/Inside/Upstairs):
                                <input
                                    type="text"
                                    value={newCustomer.note}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, note: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Time (Hours):
                                <input
                                    type="time"
                                    value={newCustomer.time}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, time: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    value={newCustomer.date}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, date: e.target.value })
                                    }
                                />
                            </label>
                            <label>
                                Special requests (birthday, wheelchair, etc.):
                                <input
                                    type="text"
                                    value={newCustomer.specialRequest}
                                    onChange={(e) =>
                                        setNewCustomer({ ...newCustomer, specialRequest: e.target.value })
                                    }
                                />
                            </label>
                            <button type="button" onClick={handleAddCustomer}>
                                Confirm
                            </button>
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Waitlist;

