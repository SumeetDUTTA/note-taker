import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

const RegisterForm = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    if(loading) {
    return <div className='min-h-screen bg-base-200 flex items-center justify-center'>
      <LoaderIcon className='size-10 animate-spin text-primary' />
    </div>
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await api.post("/auth/register", {
                username, email, password
            })
            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token); 
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // ✅ FIX
                // console.log(res.data);
                toast.success("User registered successfully");
                navigate("/login");
            } else {
                toast.error("Registration failed. Please try again.");
            }
            
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-transparent'>
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
			<div className='container mx-auto px-4 py-8'>
				<div className='max-w-2xl mx-auto mt-10'>
                    <div className='card bg-base-100'>
						<div className='card-body'>
                            <form onSubmit={handleSubmit} >
                                <div className='form-control mb-4'>
                                    <h2 className="text-2xl font-bold mb-4">Register</h2>
                                    <label className="block mb-2">Username</label>
                                    <input 
                                        type="text"
                                        value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                    className="input input-bordered w-full mb-4"
                                />
                                </div>
                                <div className='form-control mb-4'>
                                    <label className="block mb-2">Email</label>
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input input-bordered w-full mb-4"
                                    />
                                </div>

                                <div className='form-control mb-4'>
                                    <label className="block mb-2">Password</label>
                                    <input 
                                        type="password"
                                        value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input input-bordered w-full mb-6"
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                        {loading ? "Registering..." : "Register"}
                                    </button>
                                </div>
                            </form>
                            <p className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary font-semibold">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;