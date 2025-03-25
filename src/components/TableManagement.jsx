import { useState } from "react";
import { useCustomer } from "../CustomerContext";

function TableManagement() {
    const { tables, assignCustomerToTable } = useCustomer();
    const [currentOrder, setCurrentOrder] = useState({});
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [contestWinner, setContestWinner] = useState(false);

    // Open order modal
    const openOrderModal = (tableNumber) => {
        setSelectedTable(tableNumber);
        setIsOrderModalOpen(true);
    };

    // Close order modal
    const closeOrderModal = () => {
        setIsOrderModalOpen(false);
        setSelectedTable(null);
    };

    // Handle order item changes
    const handleOrderChange = (item, price) => {
        setCurrentOrder((prevOrder) => {
            const updatedOrder = { ...prevOrder };
            updatedOrder[item] = updatedOrder[item] ? updatedOrder[item] + 1 : 1;
            updatedOrder.total = (updatedOrder.total || 0) + price;
            return updatedOrder;
        });
    };

    // Save the order for the customer
    const saveOrder = () => {
        const updatedTables = tables.map((table) =>
            table.tableNumber === selectedTable
                ? {
                    ...table,
                    customer: {
                        ...table.customer,
                        order: currentOrder,
                    },
                }
                : table
        );
        assignCustomerToTable(updatedTables);
        closeOrderModal();
    };

    // Mark the table as done and archive it
    const printAndCheckout = () => {
        const updatedTables = tables.map((table) =>
            table.tableNumber === selectedTable
                ? {
                    ...table,
                    customer: {
                        ...table.customer,
                        isArchived: true,
                    },
                }
                : table
        );
        assignCustomerToTable(updatedTables);
        closeOrderModal();
    };

    return (
        <div className="page">
            <div className="tables-container">
                {tables.map((table) => (
                    <div
                        key={table.tableNumber}
                        className={`table-card ${table.customer ? "assigned" : "available"}`}
                    >
                        <div className="table-number">{table.tableNumber}</div>
                        <div className="customer-info">
                            {table.customer ? (
                                <>
                                    <p>{table.customer.customerName}</p>
                                    <p>{table.customer.size} people</p>
                                    <p>{table.customer.specialRequest}</p>
                                    <p>{table.customer.time}</p>
                                </>
                            ) : (
                                <p>Available</p>
                            )}
                        </div>
                        {table.customer && (
                            <div className="actions">
                                <button onClick={() => openOrderModal(table.tableNumber)}>
                                    Order
                                </button>
                                <button onClick={() => printAndCheckout(table.tableNumber)}>
                                    Archive
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Order Modal */}
            {isOrderModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeOrderModal}>
                            &times;
                        </span>
                        <h3>Reservation Details</h3>
                        <form>
                            <label>
                                Guest’s Name:
                                <input
                                    type="text"
                                    value={tables.find((table) => table.tableNumber === selectedTable)?.customer.customerName}
                                    readOnly
                                />
                            </label>
                            <label>
                                Table Number:
                                <input
                                    type="text"
                                    value={selectedTable}
                                    readOnly
                                />
                            </label>
                            <label>
                                Size:
                                <input
                                    type="number"
                                    value={tables.find((table) => table.tableNumber === selectedTable)?.customer.size}
                                    readOnly
                                />
                            </label>
                            <label>
                                Time Left:
                                <input
                                    type="text"
                                    value="30 minutes"
                                    readOnly
                                />
                            </label>
                            <label>
                                Special Event:
                                <input
                                    type="text"
                                    value={tables.find((table) => table.tableNumber === selectedTable)?.customer.specialRequest}
                                    readOnly
                                />
                            </label>
                            <label>
                                Winner of Contest?
                                <input
                                    type="radio"
                                    name="contestWinner"
                                    value="yes"
                                    checked={contestWinner}
                                    onChange={() => setContestWinner(true)}
                                />
                                Yes
                                <input
                                    type="radio"
                                    name="contestWinner"
                                    value="no"
                                    checked={!contestWinner}
                                    onChange={() => setContestWinner(false)}
                                />
                                No
                            </label>
                        </form>
                        <h4>Order Items</h4>
                        <label>
                            Signature Burgers:
                            <input
                                type="checkbox"
                                onChange={() => handleOrderChange("Classic Cheeseburger", 9.5)}
                            />
                            Classic Cheeseburger (€9.50)
                        </label>
                        <label>
                            Sides:
                            <input
                                type="checkbox"
                                onChange={() => handleOrderChange("Onion Rings", 4.5)}
                            />
                            Onion Rings (€4.50)
                        </label>
                        <label>
                            Desserts:
                            <input
                                type="checkbox"
                                onChange={() => handleOrderChange("Oreo Cheesecake", 5.0)}
                            />
                            Oreo Cheesecake (€5.00)
                        </label>
                        <h4>Bill</h4>
                        <div>
                            {Object.keys(currentOrder).map((item) =>
                                item !== "total" ? (
                                    <p key={item}>
                                        {item} x{currentOrder[item]} = €{(currentOrder[item] * 9.5).toFixed(2)}
                                    </p>
                                ) : null
                            )}
                        </div>
                        <p>Discount: €{contestWinner ? 10.0 : 0.0}</p>
                        <p>Total Amount: €{(currentOrder.total || 0) - (contestWinner ? 10.0 : 0.0)}</p>
                        <button type="button" onClick={saveOrder}>Save</button>
                        <button type="button" onClick={printAndCheckout}>Print and Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TableManagement;
