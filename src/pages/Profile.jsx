import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    email: "admin@metacore.com",
    name: "admin",
    phone: "",
    role: "",
  });

  // Load saved profile
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setUser(saved);
  }, []);

  // Save profile
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    setEdit(false);
  };

  return (
    <MainLayout title="Profile">
      <div className="card-form">
        <div className="profile-top">
          <h2>Profile Information</h2>

          {!edit ? (
            <button className="primary" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="primary" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="grid">
          <div>
            <label>Email</label>
            <input value={user.email} disabled />
          </div>

          <div>
            <label>Full Name</label>
            <input
              value={user.name}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              placeholder="Enter your phone number"
              value={user.phone}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label>Role</label>
            <input
              placeholder="Enter your role"
              value={user.role}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, role: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}