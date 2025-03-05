import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/Reservations";
import Waitlist from "./components/Waitlist";
import Orders from "./components/Orders";
import Menu from "./components/Menu";
import Staffs from "./components/Staffs";
import Settings from "./components/Settings";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  // Function to render the selected page
  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Reservations":
        return <Reservations />;
      case "Waitlist":
        return <Waitlist />;
      case "Orders":
        return <Orders />;
      case "Menu":
        return <Menu />;
      case "Staffs":
        return <Staffs />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <Topbar currentPage={currentPage} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
