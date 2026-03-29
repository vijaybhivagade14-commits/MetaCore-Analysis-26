import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("form");
  const [editIndex, setEditIndex] = useState(null);
const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    referred: "",
    code: "",
  });

  // 🔹 Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  // 🔹 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add / Update
  const handleSubmit = () => {
    if (!form.name || !form.age) return;

    if (editIndex !== null) {
      const updated = [...patients];
      updated[editIndex] = form;
      setPatients(updated);
      setEditIndex(null);
    } else {
      const newPatient = {
        ...form,
        code: "P" + String(patients.length + 1).padStart(4, "0"),
      };
      setPatients([...patients, newPatient]);
    }

    clearForm();
    setActiveTab("list");
  };

  const clearForm = () => {
    setForm({
      name: "",
      age: "",
      gender: "",
      contact: "",
      email: "",
      address: "",
      referred: "",
      code: "",
    });
  };

  const handleEdit = (index) => {
    setForm(patients[index]);
    setEditIndex(index);
    setActiveTab("form");
  };

  const handleDelete = (index) => {
    const updated = patients.filter((_, i) => i !== index);
    setPatients(updated);
  };

  const filteredPatients = patients.filter((p) =>
  p.name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <MainLayout title="Patients">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "form" ? "active" : ""}
          onClick={() => setActiveTab("form")}
        >
          Add/Edit Patient
        </button>

        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Patient List
        </button>
      </div>

      {/* FORM */}
      {activeTab === "form" && (
        <div className="card-form">
          <h2>Add New Patient</h2>

          <div className="grid">
            <div>
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <label>Age *</label>
              <input name="age" value={form.age} onChange={handleChange} />
            </div>

            <div>
              <label>Gender *</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label>Contact Number *</label>
              <input name="contact" value={form.contact} onChange={handleChange} />
            </div>

            <div>
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} />
            </div>

            <div>
              <label>Address *</label>
              <input name="address" value={form.address} onChange={handleChange} />
            </div>

            <div>
              <label>Referred By</label>
              <select name="referred" value={form.referred} onChange={handleChange}>
                <option>Select Doctor</option>
                <option>Dr. Sharma</option>
                <option>Dr. Patel</option>
              </select>
            </div>

            <div>
              <label>Patient Code</label>
              <input value={form.code || "Auto Generated"} disabled />
            </div>
          </div>

          <div className="form-buttons">
            <button className="primary" onClick={handleSubmit}>
              {editIndex !== null ? "Update Patient" : "Add Patient"}
            </button>

            <button onClick={clearForm}>Clear Form</button>
          </div>
        </div>
      )}

      {/* LIST */}
      {/* LIST */}
{activeTab === "list" && (
  <div className="card-form">
    <h2>Patient List</h2>

    {/* 🔍 Search */}
    <input
      className="search"
      placeholder="Search patient by name..."
      onChange={(e) => setSearch(e.target.value)}
    />

    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Referred</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredPatients.length === 0 ? (
          <tr>
            <td colSpan="8" className="no-data">
              No Patient Found
            </td>
          </tr>
        ) : (
          filteredPatients.map((p, i) => (
            <tr key={i}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.contact}</td>
              <td>{p.email}</td>
              <td>{p.referred}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}
    </MainLayout>
  );
}