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
                    <div className="modal-content modal-content--order">
                        <span className="close-button" onClick={closeOrderModal}>
                            &times;
                        </span>
                        <h3>Reservation Details</h3>
                        <div className="order__container">
                            <form className="order__form">
                                <label>
                                    <p>Guest’s Name:</p>
                                    <input
                                        type="text"
                                        value={tables.find((table) => table.tableNumber === selectedTable)?.customer.customerName}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <p>Table Number:</p>
                                    <input
                                        type="text"
                                        value={selectedTable}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <p>Size:</p>
                                    <input
                                        type="number"
                                        value={tables.find((table) => table.tableNumber === selectedTable)?.customer.size}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <p>Time Left:</p>
                                    <input
                                        type="text"
                                        value="30 minutes"
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <p>Special Event:</p>
                                    <input
                                        type="text"
                                        value={tables.find((table) => table.tableNumber === selectedTable)?.customer.specialRequest}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <h4>Winner of Contest?</h4>
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
                            <div className="menu">
                                <h4>Order Items</h4>
                                <label>
                                    <p>Signature Burgers:</p>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleOrderChange("Classic Cheeseburger", 9.5)}
                                    />
                                    Classic Cheeseburger (€9.50)
                                    <input
                                        type="checkbox"
                                        onChange={() => handleOrderChange("Classic Cheeseburger", 11)}
                                    />
                                    Smokey BBQ Burger (€11.00)
                                </label>
                                <label>
                                    <p>Sides:</p>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleOrderChange("Onion Rings", 4.5)}
                                    />
                                    Onion Rings (€4.50)
                                </label>
                                <label>
                                    <p>Desserts:</p>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleOrderChange("Oreo Cheesecake", 5.0)}
                                    />
                                    Oreo Cheesecake (€5.00)
                                </label>
                            </div>
                            <div className="bill">
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
                            </div>
                            <div className="order__action">
                                <button type="button" onClick={saveOrder}>Save</button>
                                <button type="button" onClick={printAndCheckout}>Print and Checkout</button>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }
        </div >
    );
}

export default TableManagement;
