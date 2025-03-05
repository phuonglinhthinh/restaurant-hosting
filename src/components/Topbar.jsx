// import { FaUser, FaBell } from "react-icons/fa";
// import "./Topbar.css";

function Topbar({currentPage}) {
    return (
        <div className="topbar">
            <h2>{currentPage}</h2>
            <div className="topbar-icons">
                {/* <FaUser />
                <FaBell /> */}
            </div>
        </div>
    );
}

export default Topbar;


