import { useState, type FormEvent } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, password });
      alert("Account created! Please log in.");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-black font-semibold p-3 rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
