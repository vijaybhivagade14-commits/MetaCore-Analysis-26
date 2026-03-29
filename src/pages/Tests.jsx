import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Tests() {
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const [form, setForm] = useState({
    patient: "",
    date: "",
    category: "",
    subcategory: "",
    testName: "",
    value: "",
  });

  // 🔹 Load Data
  useEffect(() => {
    const pData = JSON.parse(localStorage.getItem("patients")) || [];
    const tData = JSON.parse(localStorage.getItem("tests")) || [];
    setPatients(pData);
    setTests(tData);
  }, []);

  // 🔹 Save Data
  useEffect(() => {
    localStorage.setItem("tests", JSON.stringify(tests));
  }, [tests]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTest = () => {
    if (!form.patient || !form.testName) return;

    setTests([...tests, form]);

    setForm({
      patient: "",
      date: "",
      category: "",
      subcategory: "",
      testName: "",
      value: "",
    });

    setActiveTab("history");
  };

  return (
    <MainLayout title="Tests">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Test
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Test History
        </button>
      </div>

      {/* ADD TEST */}
      {activeTab === "add" && (
        <div className="card-form">
          <h2>Add Test</h2>

          <div className="grid">
            {/* Patient */}
            <div>
              <label>Select Patient</label>
              <select name="patient" value={form.patient} onChange={handleChange}>
                <option value="">Select Patient</option>
                {patients.map((p, i) => (
                  <option key={i} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label>Test Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            {/* Category */}
            <div>
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select</option>
                <option>HIV</option>
                <option>Malaria</option>
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label>Subcategory</label>
              <input name="subcategory" value={form.subcategory} onChange={handleChange} />
            </div>

            {/* Test Name */}
            <div>
              <label>Test Name</label>
              <input name="testName" value={form.testName} onChange={handleChange} />
            </div>

            {/* Value */}
            <div>
              <label>Value</label>
              <input name="value" value={form.value} onChange={handleChange} />
            </div>
          </div>

          <div className="form-buttons">
            <button className="primary" onClick={handleAddTest}>
              Save Test
            </button>

            <button className="primary">
              Generate Report
            </button>
          </div>
        </div>
      )}

      {/* HISTORY */}
      {activeTab === "history" && (
        <div className="card-form">
          <h2>Test History</h2>

          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Category</th>
                <th>Test</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {tests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">
                    No Results Found
                  </td>
                </tr>
              ) : (
                tests.map((t, i) => (
                  <tr key={i}>
                    <td>{t.patient}</td>
                    <td>{t.date}</td>
                    <td>{t.category}</td>
                    <td>{t.testName}</td>
                    <td>{t.value}</td>
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