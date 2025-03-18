import { useState } from "react";


function Reservations() {
    const [selectedTable, setSelectedTable] = useState(null);
    const [formData, setFormData] = useState({
        guestName: "",
        tableNumber: "",
        size: "",
        timeLeft: "",
        specialEvent: "",
        winner: "No",
        order: "",
        totalCost: "",
    });

    const handleTableClick = (tableNumber) => {
        setFormData({ ...formData, tableNumber }); // prefill table number
        setSelectedTable(tableNumber);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClose = () => {
        setSelectedTable(null);
        setFormData({
            guestName: "",
            tableNumber: "",
            size: "",
            timeLeft: "",
            specialEvent: "",
            winner: "No",
            order: "",
            totalCost: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reservation Saved: ", formData);
        handleClose();
    };

    return (
        <div className="page">
            <h2>Reservations</h2>
            <div className="reservation-header">
                <p>Make a new reservation by clicking on the table</p>
                <div className="reservation-actions">
                    <input type="text" placeholder="Search..." />
                    <button>Filter</button>
                </div>
            </div>
            <div className="tables-grid">
                {[...Array(24)].map((_, i) => (
                    <div
                        key={i + 1}
                        className="table-box"
                        onClick={() => handleTableClick(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            {selectedTable && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleClose}>
                            X
                        </button>
                        <h3>Reservation Form for Table {selectedTable}</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Guest’s Name:</label>
                            <input
                                type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={handleChange}
                                required
                            />

                            <label>Table Number:</label>
                            <input
                                type="text"
                                name="tableNumber"
                                value={formData.tableNumber}
                                readOnly
                            />

                            <label>Size:</label>
                            <input
                                type="number"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                            />

                            <label>Time Left (minutes):</label>
                            <input
                                type="number"
                                name="timeLeft"
                                value={formData.timeLeft}
                                onChange={handleChange}
                            />

                            <label>Special Event:</label>
                            <select
                                name="specialEvent"
                                value={formData.specialEvent}
                                onChange={handleChange}
                            >
                                <option value="">None</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Ceremony">Ceremony</option>
                                <option value="Graduation">Graduation</option>
                            </select>

                            <label>Winner of Contest (discount):</label>
                            <select
                                name="winner"
                                value={formData.winner}
                                onChange={handleChange}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>

                            <label>Orders (comma separated):</label>
                            <input
                                type="text"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                            />

                            <label>Total Cost (€):</label>
                            <input
                                type="number"
                                name="totalCost"
                                value={formData.totalCost}
                                onChange={handleChange}
                            />

                            <button type="submit">Save Reservation</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Reservations;


