import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const [edit, setEdit] = useState(false);

  const defaultUser = {
    email: "admin@metacore.com",
    name: "admin",
    phone: "",
    role: "",
  };

  const [user, setUser] = useState(defaultUser);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));

    if (saved) {
      setUser({
        email: saved.email || defaultUser.email,
        name: saved.name || "",
        phone: saved.phone || "",
        role: saved.role || "",
      });
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    setEdit(false);
  };

 
  const handleCancel = () => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    setUser(saved || defaultUser);
    setEdit(false);
  };

  return (
    <MainLayout title="Profile">
      <div className="card-form">

        {/* 🔥 PROFILE IMAGE */}
        <div className="profile-img-box">
          <img src="/profile.jpg" alt="profile" />
        </div>

        {/* TOP */}
        <div className="profile-top">
          <h2>Profile Information</h2>

          {!edit ? (
            <button className="primary" onClick={() => setEdit(true)}>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="primary" onClick={handleSave}>
                Save
              </button>

              <button className="secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="grid">
          <div>
            <label>Email</label>
            <input value={user.email || ""} disabled />
          </div>

          <div>
            <label>Full Name</label>
            <input
              value={user.name || ""}
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
              value={user.phone || ""}
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
              value={user.role || ""}
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