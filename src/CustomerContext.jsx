import React, { createContext, useContext, useState } from "react";

// Create context
const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
    const [waitlist, setWaitlist] = useState([
        {
            id: 1,
            customerName: "Anna Gtierre",
            size: 4,
            time: "14:00",
            specialRequest: "Birthday",
            isAssigned: false,
        },
        {
            id: 2,
            customerName: "Diana",
            size: 1,
            time: "13:15",
            specialRequest: "None",
            isAssigned: false,
        },
        {
            id: 3,
            customerName: "Truc Jollies",
            size: 6,
            time: "13:00",
            specialRequest: "Ceremony",
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
