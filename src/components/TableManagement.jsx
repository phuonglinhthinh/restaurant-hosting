import { useState } from "react";
import { useCustomer } from "../CustomerContext";

function TableManagement() {
    const { tables, waitlist, assignCustomerToTable, menu, archiveOrder } = useCustomer();
    const [currentOrder, setCurrentOrder] = useState({});
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
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

    const closeCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
    };

    // Handle order item changes
    const handleOrderChange = (item, action) => {
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
                // Find the category of the item and get the price
                const itemCategory = Object.keys(menu).find(category =>
                    menu[category].some(menuItem => menuItem.name === key)
                );

                const menuItem = menu[itemCategory]?.find(menuItem => menuItem.name === key);

                if (menuItem) {
                    total += updatedOrder[key] * menuItem.price; // Calculate price for each item
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

    const handleCheckout = () => {
        setIsCheckoutModalOpen(true); // Open checkout modal to review the bill
    };

    const archiveOrderDetails = () => {
        const orderDetails = {
            tableNumber: selectedTable,
            customerName: customer?.customerName,
            order: currentOrder,
        };
        archiveOrder(orderDetails);  // Archive the order
        closeCheckoutModal();  // Close the checkout modal

        // After archiving, reset the table and mark it as available again
        const updatedTables = tables.map((table) =>
            table.tableNumber === selectedTable
                ? {
                    ...table,
                    customer: null,  // Make the table available again by resetting customer
                }
                : table
        );
        assignCustomerToTable(waitlist, updatedTables);
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
                                <button onClick={handleCheckout}>
                                    Print and Checkout
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
                                {Object.keys(menu).map((category) => (
                                    <div key={category}>
                                        <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                                        {menu[category].map((item) => (
                                            <label key={item.name}>
                                                <p>{item.name}</p>
                                                <button
                                                    onClick={() => handleOrderChange(item.name, "subtract")}
                                                    disabled={!currentOrder[item.name] || currentOrder[item.name] <= 0}
                                                >
                                                    -
                                                </button>
                                                {currentOrder[item.name] || 0}
                                                <button onClick={() => handleOrderChange(item.name, "add")}>+</button>
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className="bill">
                                <h4>Bill</h4>
                                <div>
                                    {Object.keys(currentOrder).map((item) => {
                                        // Skip the 'total' key, it's calculated separately
                                        if (item === "total") return null;

                                        // Find the category for the item and get the item details
                                        const itemCategory = Object.keys(menu).find(category =>
                                            menu[category].some(menuItem => menuItem.name === item)
                                        );

                                        const menuItem = menu[itemCategory]?.find(menuItem => menuItem.name === item);

                                        if (menuItem) {
                                            return (
                                                <p key={item}>
                                                    {item} x{currentOrder[item]} = €{(currentOrder[item] * menuItem.price).toFixed(2)}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <p>Discount: €{contestWinner ? 10.0 : 0.0}</p>
                                <p>Total Amount: €{(currentOrder.total || 0) - (contestWinner ? 10.0 : 0.0)}</p>
                            </div>
                            <div className="order__action">
                                <button onClick={prepareOrders}>Prepare the Order</button>
                                <button onClick={saveOrder}>Save</button>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            {isCheckoutModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeCheckoutModal}>
                            &times;
                        </span>
                        <h3>Review the Bill</h3>
                        <div className="bill">
                            <h4>Bill</h4>
                            <div>
                                <p>Table: {selectedTable}</p>
                                <p>Customer: {customer?.customerName}</p>
                                {Object.keys(currentOrder).map((item) => {
                                    // Skip the 'total' key, it's calculated separately
                                    if (item === "total") return null;

                                    // Find the category for the item and get the item details
                                    const itemCategory = Object.keys(menu).find(category =>
                                        menu[category].some(menuItem => menuItem.name === item)
                                    );

                                    const menuItem = menu[itemCategory]?.find(menuItem => menuItem.name === item);

                                    if (menuItem) {
                                        return (
                                            <p key={item}>
                                                {item} x{currentOrder[item]} = €{(currentOrder[item] * menuItem.price).toFixed(2)}
                                            </p>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <p>Discount: €{contestWinner ? 10.0 : 0.0}</p>
                            <p>Total Amount: €{(currentOrder.total || 0) - (contestWinner ? 10.0 : 0.0)}</p>
                        </div>
                        <button onClick={archiveOrderDetails}>Archive</button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default TableManagement;
