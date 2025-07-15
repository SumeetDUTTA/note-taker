import { ArrowLeftIcon, LoaderIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin text-primary" />
      </div>
    );
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await api.post("/auth/login", { email, password });
            const token = res.data.token
            if(!token) {
                throw new Error("No token received");
            }
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // console.log(res.data);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-11">
          <div className="card bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input input-bordered w-full mb-4"
                />

                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input input-bordered w-full mb-6"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? "Logging in…" : "Login"}
                </button>
              </form>

              <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary font-semibold">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm
