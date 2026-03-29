import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";   // ✅ ADD THIS
import Tests from "../pages/Tests";         // (next ke liye ready)
import Reports from "../pages/Reports";     // (next ke liye ready)

export default function AppRoutes() {
  const { isAuth } = useContext(AppContext);

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          {/* ✅ Main Pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/reports" element={<Reports />} />

          {/* ✅ Default Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}