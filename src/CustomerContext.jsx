import React, { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
    const [waitlist, setWaitlist] = useState([
        {
            id: 1,
            customerName: "Anna Gtierre",
            size: "4",
            tablePreference:"Ouside",
            time: "14:00",
            specialRequest: "Birthday",
            date: "2025-04-02",
            isAssigned: false,
        },
        {
            id: 2,
            customerName: "Diana",
            size: "1",
            tablePreference: "Inside",
            time: "13:15",
            specialRequest: "None",
            date: "2025-04-05",
            isAssigned: false,
        },
        {
            id: 3,
            customerName: "Truc Jollies",
            size: "6",
            tablePreference: "Window",
            time: "13:00",
            specialRequest: "Ceremony",
            date: "2025-04-05",
            isAssigned: false,
        },
    ]);

    const [tables, setTables] = useState(
        Array(10).fill(null).map((_, index) => ({
            tableNumber: index + 1,
            customer: null,
        }))
    );

    // Function to assign a customer to a table
    const assignCustomerToTable = (updatedWaitlist, updatedTables) => {
        setWaitlist(updatedWaitlist);
        setTables(updatedTables);
    };



    return (
        <CustomerContext.Provider value={{ waitlist, tables, assignCustomerToTable }}>
            {children}
        </CustomerContext.Provider>
    );
};

// Custom hook to use the context
export const useCustomer = () => {
    return useContext(CustomerContext);
};
