import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">METACORE</h2>

      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/patients">Patients</NavLink>
      <NavLink to="/tests">Tests</NavLink>
      <NavLink to="/reports">Reports</NavLink>
    </div>
  );
}