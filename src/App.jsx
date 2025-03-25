import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/TableManagement";
import Waitlist from "./components/Waitlist";
import Orders from "./components/Orders";
import Menu from "./components/Menu";
import Archive from "./components/Archive";
import Settings from "./components/Settings";
import { CustomerProvider } from "./CustomerContext";
import "./App.css";
import TableManagement from "./components/TableManagement";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // Function to render the selected page
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Waitlist":
        return <Waitlist />;
      case "Table Management":
        return <TableManagement />;
      case "Orders":
        return <Orders />;
      case "Menu":
        return <Menu />;
      case "Staffs":
        return <Archive />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <CustomerProvider>
      <div className="app-container">
        <Sidebar setCurrentPage={setCurrentPage} />
        <div className="main-content">
          <Topbar currentPage={currentPage} />
          {renderPage()}
        </div>
      </div>
    </CustomerProvider>
  );
}

export default App;
