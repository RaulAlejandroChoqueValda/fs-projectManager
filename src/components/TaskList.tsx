import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState.tsx";

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    onDeleteTask: (id: number) => void;
    onToggleComplete: (id: number) => void;
};

function TaskList(props: TaskListProps) {
    if (props.tasks.length === 0) {
        return <EmptyState />;
    }

    return(
        <ul className="list-none pl-0 w-full">
            {   
                props.tasks.map((task) =>(
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onDelete={props.onDeleteTask} 
                        onToggleComplete={props.onToggleComplete}   
                    />
                ))
            }
        </ul>
    );
}

export default TaskList;