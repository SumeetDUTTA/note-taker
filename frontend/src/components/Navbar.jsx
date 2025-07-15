import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    const handleLogout = () => {
        localStorage.removeItem("token");
        // clear default header if used
        navigate("/login");
    };

    return (
    <header className='border-base-300 border-b border-base-content/10'>
        <div className='mx-auto-maxw-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>ThinkBoard</h1>
                <div className='flex items-center gap-4'>
                    {token ? (
                        <>
                            <Link to="/create" className='btn btn-primary flex items-center gap-1'>
                                <PlusIcon className='size-5' />
                                <span>New Note</span>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-ghost">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/create"} className="btn btn-primary" >
                                <PlusIcon className='size-5' />
                                <span>New Note</span>
                            </Link>
                            <Link to={"/register"} className='btn btn-primary' >
                                <span>Sign Up</span>
                            </Link>
                            <Link to={"/login"} className='btn btn-primary' >
                                <span>Login</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
    )
}

export default Navbar