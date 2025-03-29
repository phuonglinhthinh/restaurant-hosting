import { useState } from "react";
import { useCustomer } from "../CustomerContext";

function TableManagement() {
    const { tables, waitlist, assignCustomerToTable, menu, archiveOrder } = useCustomer();
    const [currentOrder, setCurrentOrder] = useState({});
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [contestWinner, setContestWinner] = useState(false);

    const [isButtonActive, setIsButtonActive] = useState(false);

    const openOrderModal = (tableNumber) => {
        setSelectedTable(tableNumber);
        setIsOrderModalOpen(true);
    };

    const closeOrderModal = () => {
        setIsOrderModalOpen(false);
        setSelectedTable(null);
    };

    const closeCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
    };

    const handleOrderChange = (item, action) => {
        setCurrentOrder((prevOrder) => {
            const updatedOrder = { ...prevOrder };

            if (action === "add") {
                updatedOrder[item] = updatedOrder[item] ? updatedOrder[item] + 1 : 1;
            } else if (action === "subtract" && updatedOrder[item] > 1) {
                updatedOrder[item] = updatedOrder[item] - 1;
            } else if (action === "subtract" && updatedOrder[item] === 1) {
                delete updatedOrder[item];
            }

            updatedOrder.total = Object.keys(updatedOrder).reduce((total, key) => {
                const itemCategory = Object.keys(menu).find(category =>
                    menu[category].some(menuItem => menuItem.name === key)
                );

                const menuItem = menu[itemCategory]?.find(menuItem => menuItem.name === key);

                if (menuItem) {
                    total += updatedOrder[key] * menuItem.price;
                }
                return total;
            }, 0);

            return updatedOrder;
        });
    };

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

        addOrder(order);
        setIsButtonActive(true);
    }

    const handleCheckout = (tableNumber) => {
        setSelectedTable(tableNumber);
        const table = tables.find((t) => t.tableNumber === tableNumber);
        if (table?.customer?.order) {
            setCurrentOrder(table.customer.order);
        }
        setIsCheckoutModalOpen(true);
    };

    const archiveOrderDetails = () => {
        const orderDetails = {
            tableNumber: selectedTable,
            customerName: customer?.customerName,
            order: currentOrder,
        };
        archiveOrder(orderDetails);
        closeCheckoutModal();

        const updatedTables = tables.map((table) =>
            table.tableNumber === selectedTable
                ? {
                    ...table,
                    customer: null,
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
                                <button onClick={() => handleCheckout(table.tableNumber)}>
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
                                        if (item === "total") return null;
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
                                <button
                                    onClick={prepareOrders}
                                    className={isButtonActive ? "active" : ""}>Prepare the Order</button>
                                <button onClick={saveOrder}>Save</button>
                            </div>
                        </div>
                    </div>
                </div >
            )}
            {isCheckoutModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        {console.log("Checkout Modal Data:", customer, currentOrder)}
                        <span className="close-button" onClick={closeCheckoutModal}>
                            &times;
                        </span>
                        <h3>Check out</h3>
                        <div className="bill">
                            <h4>Bill</h4>
                            <div>
                                <p>Table: {selectedTable}</p>
                                <p>Customer: {selectedTableData?.customer?.customerName || "Unknown"}</p>
                                {Object.keys(currentOrder).map((item) => {
                                    if (item === "total") return null;
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
