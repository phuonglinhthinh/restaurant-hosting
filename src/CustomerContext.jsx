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

    const [orders, setOrders] = useState([]); // New state to store orders
    const [archivedOrders, setArchivedOrders] = useState([]); 

    const menu = {
        mains: [
            { name: "Classic Cheese Burger", price: 9.5 },
            { name: "Cheeseburger", price: 12 },
            { name: "Smokey BBQ Burger", price: 11 },
            { name: "Veggie Burger", price: 12 },
            { name: "Double Stack Burger", price: 15 },
        ],
        sides: [
            { name: "French Fries", price: 3 },
            { name: "Oreo Cheesecake", price: 5 },
            { name: "Onion Rings", price: 4.5 },
        ],
        drinks: [
            { name: "Soda", price: 2 },
            { name: "Milkshakes", price: 6 },
            { name: "Iced Tea", price: 2.5 },
        ],
        specials: [
            { name: "Truffle Burger", price: 17 },
            { name: "Spicy Jalapeño Burger", price: 13 },
        ],
    };

    // Function to assign a customer to a table
    const assignCustomerToTable = (updatedWaitlist, updatedTables) => {
        setWaitlist(updatedWaitlist);
        setTables(updatedTables);
    };

    // Function to add an order to the orders list
    const addOrder = (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    // Function to archive an order
    const archiveOrder = (order) => {
        setArchivedOrders((prevArchivedOrders) => [...prevArchivedOrders, order]);
    };

    return (
        <CustomerContext.Provider value={{
            waitlist, tables, assignCustomerToTable, orders, addOrder, archivedOrders,
            archiveOrder, menu }}>
            {children}
        </CustomerContext.Provider>
    );
};

// Custom hook to use the context
export const useCustomer = () => {
    return useContext(CustomerContext);
};
