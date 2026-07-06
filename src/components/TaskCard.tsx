type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type TaskCardProps = {
    task: Task;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
};

function TaskCard(props: TaskCardProps) {
    return(
        <li className={props.task.completed ? "task completed" : "task"}>
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={props.task.completed}
                    onChange={() => props.onToggleComplete(props.task.id)}
                />

                <span>{props.task.text}</span>
            </div>
            
            <button className="delete-task-button" onClick={() => props.onDelete(props.task.id)}>
                Eliminar
            </button>
        </li>
    );
}

export default TaskCard;