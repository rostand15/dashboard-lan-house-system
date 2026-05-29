import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </div>
  );
}