import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const newForm={
            email:formData.email,
            answer:formData.answer,
            newPassword:formData.newPassword
        }
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/forget-password",
        newForm
      );

      if (res && res.data.success===true) {
        setLoading(false)
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{
          backgroundImage: `url('http://wallpapercave.com/wp/wp1945909.jpg')`,
          zIndex: -2,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-[-1]"></div>

      {/* Forgot Password Form */}
      <form
        className="bg-black bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 z-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Reset Password
        </h2>
        <p className="text-center text-gray-300 mb-4">
          Enter your email, answer, and new password
        </p>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="answer"
            placeholder="Answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-5 py-3 border border-gray-600 bg-black text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
