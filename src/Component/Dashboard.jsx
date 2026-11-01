import { useReducer } from "react";
import tasksReducer from "./tasksReducer";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./Dashboard.css";
import UserList from "./UserList";
import TaskCharts from "./TaskCharts";

function Dashboard() {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const RADIUS = 52;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const ringOffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  let message = "Add your first task to get started";
  if (total > 0 && percent === 0) message = "Time to knock out your first task";
  else if (percent > 0 && percent < 50) message = "Good start, keep going";
  else if (percent >= 50 && percent < 100) message = "More than halfway there";
  else if (total > 0 && percent === 100) message = "All done. Great work!";

  return (
    <main className="dashboard">
                <section id="stats" className="overview">
          <div className="ov-hero">
            <div className="ring">
              <svg viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "var(--accent)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--accent-c)" }} />
                  </linearGradient>
                </defs>
                <circle className="ring__track" cx="60" cy="60" r={RADIUS} />
                <circle
                  className="ring__bar"
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={ringOffset}
                />
              </svg>
              <div className="ring__label">
                <span className="ring__percent">{percent}%</span>
                <span className="ring__sub">done</span>
              </div>
            </div>

            <div className="ov-hero__text">
              <h3>Your Progress</h3>
              <p>{message}</p>
            </div>
          </div>

          <div className="ov-cards">
            <div className="ov-card ov-card--total">
              <div className="ov-card__top">
                <div className="ov-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="3" width="14" height="18" rx="2" />
                    <path d="M9 3v2h6V3" />
                    <path d="M9 10h6M9 14h6M9 18h3" />
                  </svg>
                </div>
                <div className="ov-card__info">
                  <span className="ov-card__value">{total}</span>
                  <span className="ov-card__label">Total</span>
                </div>
              </div>
              <div className="ov-card__bar"><span style={{ width: total ? "100%" : "0%" }} /></div>
              <svg className="ov-card__wave" viewBox="0 0 240 40" preserveAspectRatio="none">
                <path d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20 T150 20 T180 20 T210 20 T240 20 V40 H0Z" />
              </svg>
            </div>

            <div className="ov-card ov-card--done">
              <div className="ov-card__top">
                <div className="ov-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5l3 3 5-6" />
                  </svg>
                </div>
                <div className="ov-card__info">
                  <span className="ov-card__value">{completed}</span>
                  <span className="ov-card__label">Completed</span>
                </div>
              </div>
              <div className="ov-card__bar"><span style={{ width: `${percent}%` }} /></div>
              <svg className="ov-card__wave" viewBox="0 0 240 40" preserveAspectRatio="none">
                <path d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20 T150 20 T180 20 T210 20 T240 20 V40 H0Z" />
              </svg>
            </div>

            <div className="ov-card ov-card--pending">
              <div className="ov-card__top">
                <div className="ov-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div className="ov-card__info">
                  <span className="ov-card__value">{pending}</span>
                  <span className="ov-card__label">Pending</span>
                </div>
              </div>
              <div className="ov-card__bar">
                <span style={{ width: total ? `${100 - percent}%` : "0%" }} />
              </div>
              <svg className="ov-card__wave" viewBox="0 0 240 40" preserveAspectRatio="none">
                <path d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20 T150 20 T180 20 T210 20 T240 20 V40 H0Z" />
              </svg>
            </div>
          </div>
        </section>

        <section id="tasks" className="dashboard__panel">
          <h2>My Tasks</h2>
          <TaskForm onAddTask={(text) => dispatch({ type: "ADD", text })} />
          <TaskList
            tasks={tasks}
            onToggle={(id) => dispatch({ type: "TOGGLE", id })}
            onDelete={(id) => dispatch({ type: "DELETE", id })}
          />
        </section>
        <TaskCharts tasks={tasks} />

        <section id="users" className="dashboard__panel">
          <h2>Users</h2>
          <UserList />
        </section>
    </main>
  );
}

export default Dashboard;