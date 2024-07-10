import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../services/AxiosInstance';

function FormSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/signup', { name, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                toast.success('Registration successful!');
                navigate('/login');
            })
            .catch(error => {
                console.error('Registration failed:', error);
                toast.error('Registration failed. Please try again.');
            });
    };

    return (
        <div className="bg-red-200 px-20 py-20 rounded-3xl border-2 border-gray-400">
            <h1 className="text-5xl font-semibold text-black">Sign Up</h1>
            <p className="font-medium text-lg text-gray-700 mt-4">Welcome! Please enter your details</p>
            <form onSubmit={handleSubmit} className="mt-8">
                <div>
                    <label className="text-lg font-medium text-gray-700" htmlFor="name">Name</label>
                    <input
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="text-lg font-medium text-gray-700" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mt-8 flex flex-col gap-y-4">
                    <button
                        type="submit"
                        className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-black text-lf font-bold"
                    >
                        Sign up
                    </button>
                </div>
            </form>
            <label className="ml-2 font-medium text-[15px] text-black mt-4" htmlFor="remember">Already Have Account</label>
            <div className="mt-3 flex flex-col gap-y-4">
                <button
                    className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-lf font-bold text-black border-[2px] border-black"
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default FormSignup