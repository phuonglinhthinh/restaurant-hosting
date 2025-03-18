import { useState } from "react";

function TableManagement() {
    const [tables, setTables] = useState([
        { id: 1, customerName: "Anna Gtierre", size: 4, time: "14:00", specialRequest: "Birthday", order: [], discount: 0, isAssigned: true },
        { id: 3, customerName: "Diana", size: 1, time: "13:15", specialRequest: "None", order: [], discount: 0, isAssigned: true },
        { id: 6, customerName: "Truc Jollies", size: 6, time: "13:00", specialRequest: "Ceremony", order: [], discount: 0, isAssigned: true },
        { id: 7, customerName: "Available", size: 0, time: "", specialRequest: "", order: [], discount: 0, isAssigned: false },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({
        tableId: null,
        items: [],
        totalAmount: 0,
        discount: 0,
    });

    const handleAddOrder = (tableId) => {
        setCurrentOrder({ tableId, items: [], totalAmount: 0, discount: 0 });
        setIsModalOpen(true);
    };

    const handleSaveOrder = () => {
        const updatedTables = tables.map((table) =>
            table.id === currentOrder.tableId
                ? { ...table, order: currentOrder.items, discount: currentOrder.discount }
                : table
        );
        setTables(updatedTables);
        setIsModalOpen(false);
    };

    const handleArchive = (id) => {
        const updatedTables = tables.map((table) =>
            table.id === id ? { ...table, isAssigned: false } : table
        );
        setTables(updatedTables);
    };

    return (
        <div className="page">
            <h2>Table Management</h2>
            <div className="tables-container">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className={`table-card ${table.isAssigned ? "assigned" : "available"}`}
                    >
                        <div className="table-info">
                            <div className="table-number">{table.id}</div>
                            <div className="customer-info">
                                {table.customerName && <p>{table.customerName}</p>}
                                {table.isAssigned ? (
                                    <>
                                        <p>{table.size} people</p>
                                        <p>{table.specialRequest}</p>
                                        <p>{table.time}</p>
                                    </>
                                ) : (
                                    <p>Available</p>
                                )}
                            </div>
                        </div>
                        {table.isAssigned && (
                            <div className="actions">
                                <button onClick={() => handleArchive(table.id)}>Archive</button>
                                <button onClick={() => handleAddOrder(table.id)}>Order</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Order Modal */}
            {isModalOpen && (
                <div className="order-modal">
                    <div className="modal-content">
                        <span
                            className="close-button"
                            onClick={() => setIsModalOpen(false)}
                        >
                            &times;
                        </span>
                        <h3>Order for Table {currentOrder.tableId}</h3>
                        {/* Add menu items here */}
                        <div className="menu-items">
                            <label>
                                Classic Cheeseburger
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        const updatedItems = [...currentOrder.items, "Classic Cheeseburger"];
                                        const newTotal = updatedItems.length * 9.5; // Update the price dynamically
                                        setCurrentOrder({ ...currentOrder, items: updatedItems, totalAmount: newTotal });
                                    }}
                                />
                            </label>
                            <label>
                                Fries
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        const updatedItems = [...currentOrder.items, "Fries"];
                                        const newTotal = updatedItems.length * 3.5; // Update the price dynamically
                                        setCurrentOrder({ ...currentOrder, items: updatedItems, totalAmount: newTotal });
                                    }}
                                />
                            </label>
                        </div>
                        <div className="order-summary">
                            <p>Bill: €{currentOrder.totalAmount}</p>
                            <label>
                                Winner of the contest?
                                <select
                                    value={currentOrder.discount ? "yes" : "no"}
                                    onChange={(e) => {
                                        const newDiscount = e.target.value === "yes" ? 10 : 0; // Discount applied
                                        setCurrentOrder({ ...currentOrder, discount: newDiscount, totalAmount: currentOrder.totalAmount - newDiscount });
                                    }}
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </select>
                            </label>
                            <p>Total Amount: €{currentOrder.totalAmount}</p>
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleSaveOrder}>Save</button>
                            <button>Print and Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableManagement;
