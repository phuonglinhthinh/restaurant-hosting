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
      case "dashboard":
        return <Dashboard />;
      case "reservations":
        return <Reservations />;
      case "waitlist":
        return <Waitlist />;
      case "orders":
        return <Orders />;
      case "menu":
        return <Menu />;
      case "staffs":
        return <Staffs />;
      case "settings":
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
