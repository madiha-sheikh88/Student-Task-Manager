import { useState, useRef } from "react";
import "./TaskForm.css"

function TaskForm({onAddTask}){
    const [taskText, setTaskText] = useState("");
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(taskText);
        if (taskText.trim() === "") return;
            onAddTask(taskText.trim());
                setTaskText("");
    }
    return(
        <>
        <form className="task-form" onSubmit={handleSubmit}>
            <input ref={inputRef} className="task-form__input" type="text" placeholder="Enter a task" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
            <button type="submit" className="task-form__button">Add Task</button>
        </form>
        </>
    );
}

export default TaskForm;