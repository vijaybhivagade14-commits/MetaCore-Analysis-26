import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <div className="cards">
        <div className="card">
          <h4>Total Patients</h4>
          <p>1</p>
        </div>

        <div className="card">
          <h4>Total Tests</h4>
          <p>2</p>
        </div>

        <div className="card">
          <h4>Reports Generated</h4>
          <p>0</p>
        </div>

        <div className="card">
          <h4>Tests Today</h4>
          <p>2</p>
        </div>
      </div>

      <h3>Quick Actions</h3>

      <div className="cards">
        <div className="card">Add Patient</div>
        <div className="card">Add Test</div>
        <div className="card">Generate Report</div>
      </div>
    </MainLayout>
  );
}