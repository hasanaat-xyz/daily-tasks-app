import TaskCard from "./TaskCard";

export default function TaskList({ tasks, refresh }) {

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks today ✨</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          refresh={refresh}
        />
      ))} 
      
    </div>
  );
}
