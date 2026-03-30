import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar({ title }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="navbar">

      <h3 className="page-title">{title}</h3>

      <div className="profile-wrapper" ref={ref}>
        
        {/* PROFILE IMAGE */}
        <div
          className="profile-circle"
          onClick={() => setOpen(!open)}
        >
          <img src="/metacore.png" alt="profile" />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="dropdown">

            <div className="dropdown-header">
              <img src="/metacore.png" alt="profile" />
              <div>
                <h4>admin</h4>
                <p>admin@metacore.com</p>
              </div>
            </div>

            {/* ✅ FIX 1: NAVIGATION ADD */}
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

            {/* ✅ FIX 2: LOGOUT FUNCTION */}
            <div
              className="dropdown-item logout"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              🚪 Logout
            </div>

          </div>
        )}
      </div>

    </div>
  );
}