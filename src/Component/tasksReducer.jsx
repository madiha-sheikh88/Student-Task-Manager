
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...tasks,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];

    case "TOGGLE":
      return tasks.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE":
      return tasks.filter((task) => task.id !== action.id);

    default:
      return tasks;
  }
}

export default tasksReducer;