import { useCustomer } from "../CustomerContext";
function Orders() {
    const { orders} = useCustomer();

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
            <p>The kitchen is preparing your orders. Be patient!</p>
            {groupedOrders.length > 0 ? (
                <div className="orders-list">
                    {groupedOrders.map((order, index) => (
                        <div key={index} className="order-item">
                            <h3>Table {order.tableNumber} - {order.customerName}</h3>
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



