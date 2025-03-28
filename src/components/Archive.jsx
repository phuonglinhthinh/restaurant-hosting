import { useCustomer } from "../CustomerContext";
function Archive() {
    const { archivedOrders } = useCustomer();

    return (
        <div className="page">
            <h2>Archived Orders</h2>
            {archivedOrders.length === 0 ? (
                <p>No archived orders yet.</p>
            ) : (
                archivedOrders.map((order, index) => (
                    <div key={index}>
                        <h3>Table {order.tableNumber} - {order.customerName}</h3>
                        <ul>
                            {Object.keys(order.order).map((item) => (
                                item !== "total" && (
                                    <li key={item}>
                                        {item} x {order.order[item]}
                                    </li>
                                )
                            ))}
                        </ul>
                        <p>Total: €{order.order.total}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Archive;


