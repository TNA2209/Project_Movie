import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axiosInstance from '../../services/AxiosInstance';

function FormForgotPw() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('auth/forgot-password', { email });
      if (response.data.status) {
        toast.success("Email sent successfully!");
      } else {
        toast.error(response.data.message || "Error sending email");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleBackLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-red-200 px-20 py-20 rounded-3xl border-2 border-gray-400">
      <h1 className="text-5xl font-semibold text-black">Forgot Password</h1>
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

        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-black text-lf font-bold">Send</button>
        </div>
        <div onClick={handleBackLoginClick} className="mt-3 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl text-lf font-bold text-black border-[2px] border-black">Back</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default FormForgotPw;
