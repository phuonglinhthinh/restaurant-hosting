import { useCustomer } from "../CustomerContext";

function TableManagement() {
    const { tables } = useCustomer();
    
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
                                <button>Order</button>
                                <button>Archive</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TableManagement;
