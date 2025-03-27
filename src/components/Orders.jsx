import { useCustomer } from "../CustomerContext";
function Orders() {
    const { orders } = useCustomer(); // Get orders from context

    // Group items by name and sum up the quantities
    const groupedOrders = orders.map((order) => {
        const itemCounts = {};
        Object.keys(order.order).forEach((item) => {
            if (item !== "total") {
                itemCounts[item] = order.order[item];
            }
        });
        return {
            tableNumber: order.tableNumber,
            customerName: order.customerName,
            itemCounts: itemCounts,
        };
    });

    return (
        <div className="page">
            <p>Please wait while the kitchen is preparing your orders</p>
            {groupedOrders.length > 0 ? (
                <div className="orders-list">
                    {groupedOrders.map((order, index) => (
                        <div key={index} className="order-item">
                            <h4>Table {order.tableNumber} - {order.customerName}</h4>
                            <ul>
                                {Object.keys(order.itemCounts).map((item) => (
                                    <li key={item}>
                                        {item} x {order.itemCounts[item]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders yet.</p>
            )}
        </div>
    );
}

export default Orders;



