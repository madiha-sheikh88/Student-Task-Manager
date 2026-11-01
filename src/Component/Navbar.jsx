import logo from "../assets/logo.webp";
import "./Navbar.css";

function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="Student Task Manager logo" className="navbar__logo" />
        <span>Student Task Manager</span>
      </div>
      <button className="navbar__toggle" onClick={onToggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}

export default Navbar;