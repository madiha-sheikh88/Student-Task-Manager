import "./TaskList.css"

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0)
    return (
      <div className="task-empty">
        <span className="task-empty__icon">📝</span>
        <p>No tasks yet. Add your first one above!</p>
      </div>
    );

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "task-item--done" : ""}`}
        >
          <span className="task-item__status">
            {task.completed ? "✓" : ""}
          </span>

          <span className="task-item__text">{task.text}</span>

          <div className="task-item__actions">
            <button
              className="btn btn--complete"
              onClick={() => onToggle(task.id)}
              title={task.completed ? "Undo" : "Complete"}
            >
              <span className="btn__icon">{task.completed ? "↩" : "✓"}</span>
              <span className="btn__label">
                {task.completed ? "Undo" : "Complete"}
              </span>
            </button>
            <button
              className="btn btn--delete"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              <span className="btn__icon">✕</span>
              <span className="btn__label">Delete</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;