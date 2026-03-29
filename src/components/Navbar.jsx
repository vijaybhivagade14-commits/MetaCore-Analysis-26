import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const { logout } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h3>{title}</h3>

      <div className="profile-wrapper">
        {/* Profile Circle */}
        <div
          className="profile-circle"
          onClick={() => setOpen(!open)}
        >
          <img src="/logo192.png" alt="profile" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="profile-dropdown">
            <div className="profile-header">
              <img src="/logo192.png" alt="" />
              <div>
                <h4>admin</h4>
                <p>admin@metacore.com</p>
              </div>
            </div>

            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
            >
              👤 Profile Details
            </div>

            <div className="dropdown-item">
              🔒 Security Settings
            </div>

            <div
              className="dropdown-item logout"
              onClick={logout}
            >
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}