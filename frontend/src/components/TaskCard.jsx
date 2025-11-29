import axios from "axios";

export default function TaskCard({ task, refresh }) {
  const toggleTask = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="p-4 mb-3 border rounded-lg flex justify-between items-center">
      <div>
        <h2
          className={`font-semibold ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h2>
        {task.missed && (
          <p className="text-red-500 text-sm">Missed</p>
        )}

      </div>
      <button
        onClick={toggleTask}
        className={`px-3 py-1 rounded text-white ${
          task.completed
          ? "bg-gray-500"
          : "bg-green-500"
        }`}
      >
        {task.completed ? "Undo" : "Done"}
      </button>
    </div>
  );
}
