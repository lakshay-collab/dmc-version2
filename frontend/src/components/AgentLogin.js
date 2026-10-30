import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Navbar from "./Navbar";

const API = process.env.REACT_APP_BACKEND_URL;

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/agent/login`, { email, password });
      localStorage.setItem("agent_token", data.token);
      localStorage.setItem("agent_info", JSON.stringify(data.agent));
      navigate("/agent/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB]" data-testid="agent-login-page">
      <Navbar forceLight />
      <div className="flex items-center justify-center px-4 py-16 md:py-24">
      <div className="w-full max-w-md">
        <div data-reveal className="text-center mb-8">
          <h1 className="font-['Manrope'] font-bold tracking-tight text-3xl text-[#0D1B2A]">Agent Portal</h1>
          <p className="text-sm text-[#0D1B2A]/50 mt-2">Sign in to access your destination tools</p>
        </div>

        <form onSubmit={handleLogin} data-reveal className="bg-white rounded-3xl border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] p-8 space-y-5">
          {error && (
            <div data-testid="login-error" className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-2">Email</label>
            <input data-testid="agent-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-[#F8FAFB] border border-[#0D1B2A]/08 rounded-full px-5 py-3.5 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 focus:outline-none focus:border-[#174358]/30 focus:bg-white transition-colors"
              placeholder="agent@agency.com" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-2">Password</label>
            <div className="relative">
              <input data-testid="agent-login-password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-[#F8FAFB] border border-[#0D1B2A]/08 rounded-full px-5 py-3.5 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 focus:outline-none focus:border-[#174358]/30 focus:bg-white transition-colors pr-11"
                placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0D1B2A]/30 hover:text-[#174358] transition-colors">
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button data-testid="agent-login-submit" type="submit" disabled={loading}
            className="w-full bg-[#174358] text-white py-3.5 rounded-full text-sm font-semibold hover:bg-[#1e5a75] shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <LogIn size={16} />
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-[#0D1B2A]/50">
            Don't have an account?{" "}
            <Link to="/agent/register" className="text-[#174358] font-semibold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
      </div>
    </div>
  );
}
