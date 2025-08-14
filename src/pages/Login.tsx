import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/board");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
   <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-black font-semibold p-3 rounded-lg shadow hover:bg-blue-600 transition-colors w-full"
      >
        Login
      </button>
    </form>
    <p className="text-sm text-gray-500 mt-4">
      Don't have an account?{" "}
      <span
        onClick={() => navigate("/signup")}
        className="text-blue-500 font-semibold cursor-pointer hover:underline"
      >
        Sign Up
      </span>
    </p>
  </div>
</div>


  );
}
