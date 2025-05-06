import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../../redux/Slice/authSlice";

const UpdatePassword = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        user_id: user._id,
        password: formData.newPassword,
      };
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/update-password",
        newData,
        {
          headers: { "x-access-token": token },
        }
      );

      if (res && res.data.success === true) {
        toast.success(res.data.message);
        dispatch(clearAuth());
        navigate("/login");
      } else {
        toast.error(res.data.message || "Failed to update password.");
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

      {/* Update Password Form */}
      <form
        className="bg-black bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 z-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Update Password
        </h2>
        <p className="text-center text-gray-300 mb-4">
          Enter your new password
        </p>

        <div className="space-y-4">
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
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
