import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">

      {/* ONLY LOGO */}
      <div className="sidebar-logo">
        <img src="/metacore.png" alt="logo" />
      </div>

      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/patients">Patients</NavLink>
      <NavLink to="/tests">Tests</NavLink>
      <NavLink to="/reports">Reports</NavLink>

    </div>
  );
}