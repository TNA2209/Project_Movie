import React, { useState } from "react";
import axiosInstance from '../../services/AxiosInstance';
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function FormResetPw() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post(`auth/reset-password/${token}`, { password });
      
      if (response.data.status === "success") {
        toast.success("Password has been reset successfully");
        navigate('/login');
      } else {
        toast.error(response.data.message || "Reset password failed");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-red-200 px-20 py-20 rounded-3xl border-2 border-gray-400">
      <h1 className="text-5xl font-semibold text-black">Reset Password</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium text-gray-700" htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
            placeholder="Enter your new password"
          />
        </div>
        <div>
          <label className="text-lg font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border-2 border-black rounded-xl p-3 mt-1 bg-transparent text-black"
            placeholder="Confirm your new password"
          />
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-black text-lf font-bold">Reset Password</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default FormResetPw;
