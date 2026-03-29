import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children, title }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar title={title} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}