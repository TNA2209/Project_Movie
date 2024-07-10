import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from '../../services/AxiosInstance';
function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    const handleSignUpClick = () => {
      navigate('/signup');
    };
    const handleForgotPwClick = () => {
      navigate('/forgotpw');
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post('auth/login', { email, password });
        if (response.data.status === "admin") {
          toast.success("Admin login successful!");
          navigate('/admin');
        } else if (response.data.status === "success") {
          toast.success("Login successful!");
          navigate('/home');
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    };
  
    return (
      <div className="bg-red-200 px-20 py-20 rounded-3xl border-2 border-gray-400">
        <h1 className="text-5xl font-semibold text-black">Welcome</h1>
        <p className="font-medium text-lg text-gray-700 mt-4">Welcome! Please enter your details</p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label className="text-lg font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="text-lg font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
              placeholder="Enter your password"
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-[14px] text-black" htmlFor="remember">Remember for 30 days</label>
            </div>
            <button onClick={handleForgotPwClick} className="flex justify-end font-medium text-[14px] text-gray-700">Forgot password</button>
          </div>
          <div className="mt-8 flex flex-col gap-y-4">
            <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-black text-lf font-bold">Login</button>
          </div>
          <div className="mt-3 flex flex-col gap-y-4">
            <button onClick={handleSignUpClick} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-lf font-bold text-black border-[2px] border-black">Don't have an account? <span className="text-[12px] text-gray-700 ml-2">Sign up</span></button>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }

export default FormLogin