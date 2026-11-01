import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar__links">
        <li><a href="#stats">Overview</a></li>
        <li><a href="#tasks">Tasks</a></li>
        <li><a href="#users">Users</a></li>
      </ul>
    </aside>
  );
}

export default Sidebar;