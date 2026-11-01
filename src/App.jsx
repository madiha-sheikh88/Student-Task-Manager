import { useState } from "react";
import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";
import "./App.css";
import Background from "./Component/Background";

function App() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div className={`app ${theme}`}>
      <Background />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <div className="layout">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;