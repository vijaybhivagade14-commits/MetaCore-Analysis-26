import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">

      <div className="dashboard-grid">

        <div className="card">
          <h3>Total Patients</h3>
          <p>1</p>
        </div>

        <div className="card">
          <h3>Total Tests</h3>
          <p>2</p>
        </div>

        <div className="card">
          <h3>Reports Generated</h3>
          <p>0</p>
        </div>

        <div className="card">
          <h3>Tests Today</h3>
          <p>2</p>
        </div>

      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button>Add Patient</button>
        <button>Add Test</button>
        <button>Generate Report</button>
      </div>

    </MainLayout>
  );
}