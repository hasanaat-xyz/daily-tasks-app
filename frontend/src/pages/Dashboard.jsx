import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const PEOPLE = [
  { name: "Hasanaat", id: "hasanaat" },
  { name: "Humera", id: "humera" },
  { name: "Hafsah", id: "hafsah" }
];

export default function Dashboard() {
  const today = new Date().toISOString().slice(0, 10);
  const [allTasks, setAllTasks] = useState({
    hasanaat: [],
    humera: [],
    hafsah: []
  });

  // Fetch tasks for ONE user
  const getTasksForUser = useCallback(async (userName) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${userName}/${today}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching tasks for", userName, error);
      return [];
    }
  }, [today]);

  // Fetch tasks for ALL users

  const loadAllTasks = useCallback(async () => {

    const [hasanaat, humera, hafsah] = await Promise.all([
      getTasksForUser("hasanaat"),
      getTasksForUser("humera"),
      getTasksForUser("hafsah")
    ]);

    setAllTasks({ hasanaat, humera, hafsah });
  }, [getTasksForUser]);
  useEffect(() => {
    loadAllTasks();
  }, [loadAllTasks]);
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-purple-700 animate-pulse">
        📋 Daily Task Dashboard
      </h1>
      <p className="text-center text-gray-600 mb-10 text-lg md:text-xl">
        Date: <span className="font-semibold text-purple-600">{today}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PEOPLE.map((person) => (
          <div
            key={person.id}
            className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-center mb-5 text-purple-600 underline decoration-pink-400">
              {person.name}
            </h2>
            {allTasks[person.id].length === 0 ? (
              <p className="text-center text-gray-400 italic">
                No tasks for today
              </p> 
            ) : (
              <div className="space-y-4">
                {allTasks[person.id].map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    refresh={loadAllTasks}
                  />
                ))}
              </div> 
            )}

          </div>

        ))} 

      </div>
      
    </div>
  );
}
