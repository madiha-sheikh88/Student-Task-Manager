import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import "./TaskCharts.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// Reads colors from your CSS variables and updates when the theme class changes
function useThemeColors() {
  const [c, setC] = useState({
    text: "#e5e7eb",
    grid: "rgba(255, 255, 255, 0.08)",
    accent: "#22d3ee",
    success: "#34d399",
    warn: "#fbbf24",
  });

  useEffect(() => {
    const app = document.querySelector(".app");
    if (!app) return;

    const read = () => {
      const styles = getComputedStyle(app);
      const get = (name) => styles.getPropertyValue(name).trim();
      const isDark = app.classList.contains("dark");

      setC({
        text: get("--text"),
        grid: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(30, 27, 75, 0.10)",
        accent: get("--accent"),
        success: get("--success"),
        warn: get("--warn"),
      });
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(app, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return c;
}

function TaskCharts({ tasks }) {
  const c = useThemeColors();

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  const doughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [c.success, c.warn],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: c.text, usePointStyle: true, padding: 16 },
      },
    },
  };

  const barData = {
    labels: ["Total", "Completed", "Pending"],
    datasets: [
      {
        data: [tasks.length, completed, pending],
        backgroundColor: [c.accent, c.success, c.warn],
        borderRadius: 10,
        maxBarThickness: 48,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: c.text },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { color: c.text, stepSize: 1 },
        grid: { color: c.grid },
        border: { display: false },
      },
    },
  };

  return (
    <div className="task-charts">
      <div className="chart-card">
        <h3>Task Progress</h3>
        {tasks.length === 0 ? (
          <div className="chart-empty">Add a task to see your progress</div>
        ) : (
          <div className="chart-box">
            <Doughnut
              key={c.text}
              data={doughnutData}
              options={doughnutOptions}
            />
          </div>
        )}
      </div>

      <div className="chart-card">
        <h3>Task Overview</h3>
        <div className="chart-box">
          <Bar key={c.text} data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default TaskCharts;