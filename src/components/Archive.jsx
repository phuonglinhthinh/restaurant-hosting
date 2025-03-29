import { useCustomer } from "../CustomerContext";
function Archive() {
    const { archivedOrders } = useCustomer();

    return (
        <div className="page">
            <p>All your bills will be archived here:</p>
            {archivedOrders.length === 0 ? (
                <p>No archived bills yet.</p>
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


