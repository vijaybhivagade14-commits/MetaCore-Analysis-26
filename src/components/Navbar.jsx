import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Navbar({ title }) {
  const { logout } = useContext(AppContext);

  return (
    <div className="navbar">
      <h3>{title}</h3>

      <div className="profile">
        <span>Admin</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}