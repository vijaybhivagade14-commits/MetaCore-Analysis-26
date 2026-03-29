import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Reports() {
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientTests, setPatientTests] = useState([]);

  // 🔹 Load Data
  useEffect(() => {
    const pData = JSON.parse(localStorage.getItem("patients")) || [];
    const tData = JSON.parse(localStorage.getItem("tests")) || [];
    setPatients(pData);
    setTests(tData);
  }, []);

  // 🔹 Search Patient
  const handleSearch = () => {
    const found = patients.find((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (found) {
      setSelectedPatient(found);

      const filteredTests = tests.filter(
        (t) => t.patient === found.name
      );

      setPatientTests(filteredTests);
    } else {
      setSelectedPatient(null);
      setPatientTests([]);
    }
  };

  return (
    <MainLayout title="Reports">
      <div className="card-form">
        <h2>Generate Report</h2>

        {/* Search */}
        <input
          className="search"
          placeholder="Search Patient"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="primary" onClick={handleSearch}>
          Search
        </button>

        {/* Patient Details */}
        {selectedPatient && (
          <div className="report-box">
            <h3>Patient Details</h3>

            <p><b>Name:</b> {selectedPatient.name}</p>
            <p><b>Age:</b> {selectedPatient.age}</p>
            <p><b>Gender:</b> {selectedPatient.gender}</p>
            <p><b>Contact:</b> {selectedPatient.contact}</p>
          </div>
        )}

        {/* Test Report */}
        {patientTests.length > 0 && (
          <div className="report-box">
            <h3>Test Report</h3>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Test</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {patientTests.map((t, i) => (
                  <tr key={i}>
                    <td>{t.date}</td>
                    <td>{t.category}</td>
                    <td>{t.testName}</td>
                    <td>{t.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Data */}
        {selectedPatient && patientTests.length === 0 && (
          <p className="no-data">No Tests Found</p>
        )}

        {/* Print Button */}
        {selectedPatient && (
          <button
            className="primary"
            onClick={() => window.print()}
          >
            Print Report
          </button>
        )}
      </div>
    </MainLayout>
  );
}