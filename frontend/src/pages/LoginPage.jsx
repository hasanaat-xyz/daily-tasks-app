import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) return alert("Enter your name");
    localStorage.setItem("username", name);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >  
          Enter
        </button>
      </div>
    </div>
  );
}
