import { useState } from "react";
import { useCustomer } from "../CustomerContext";

function TableManagement() {
    const { tables, waitlist, assignCustomerToTable, itemPrices } = useCustomer();
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
    const handleOrderChange = (item, action) => {
        // const price = itemPrices[item];
        setCurrentOrder((prevOrder) => {
            const updatedOrder = { ...prevOrder };

            // Check if the item is already in the order
            if (action === "add") {
                updatedOrder[item] = updatedOrder[item] ? updatedOrder[item] + 1 : 1;
            } else if (action === "subtract" && updatedOrder[item] > 1) {
                updatedOrder[item] = updatedOrder[item] - 1;
            } else if (action === "subtract" && updatedOrder[item] === 1) {
                delete updatedOrder[item];  // Remove item from order if count is 0
            }

            // Recalculate the total based on the updated order
            updatedOrder.total = Object.keys(updatedOrder).reduce((total, key) => {
                if (key !== "total") {
                    total += updatedOrder[key] * itemPrices[key];
                }
                return total;
            }, 0);

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
        assignCustomerToTable(waitlist, updatedTables);
        closeOrderModal();
    };

    const { addOrder } = useCustomer();
    const prepareOrders = () => {
        const order = {
            tableNumber: selectedTable,
            customerName: customer?.customerName,
            order: currentOrder,
        };

        // Add the order to the orders list in context
        addOrder(order);
    }
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
        assignCustomerToTable(waitlist, updatedTables);
        closeOrderModal();
    };

    const selectedTableData = tables.find((table) => table.tableNumber === selectedTable);
    const customer = selectedTableData ? selectedTableData.customer : null;

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
                                        value={customer?.customerName || ""}
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
                                        value={customer?.size || ""}
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
                                        value={customer?.specialRequest || ""}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <h4>Winner of Burger Contest?</h4>
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
                                    <button onClick={() => handleOrderChange("Classic Cheeseburger", "subtract")}>-</button>
                                    Classic Cheeseburger
                                    <button onClick={() => handleOrderChange("Classic Cheeseburger", "add")}>+</button>
                                </label>
                                <label>
                                    <p>Sides:</p>
                                    <button onClick={() => handleOrderChange("Onion Rings", "subtract")}>-</button>
                                    Onion Rings
                                    <button onClick={() => handleOrderChange("Onion Rings", "add")}>+</button>
                                </label>
                                <label>
                                    <p>Desserts:</p>
                                    <button onClick={() => handleOrderChange("Oreo Cheesecake", "subtract")}>-</button>
                                    Oreo Cheesecake
                                    <button onClick={() => handleOrderChange("Oreo Cheesecake", "add")}>+</button>
                                </label>
                            </div>
                            <div className="bill">
                                <h4>Bill</h4>
                                <div>
                                    {Object.keys(currentOrder).map((item) =>
                                        item !== "total" ? (
                                            <p key={item}>
                                                {item} x{currentOrder[item]} = €{(currentOrder[item] * itemPrices[item]).toFixed(2)}
                                            </p>
                                        ) : null
                                    )}
                                </div>
                                <p>Discount: €{contestWinner ? 10.0 : 0.0}</p>
                                <p>Total Amount: €{(currentOrder.total || 0) - (contestWinner ? 10.0 : 0.0)}</p>
                            </div>
                            <div className="order__action">
                                <button onClick={prepareOrders}>Prepare the Order</button>
                                <button onClick={saveOrder}>Save</button>
                                <button onClick={printAndCheckout}>Print and Checkout</button>
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
