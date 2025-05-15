import React, { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useParams , useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordSeller = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(`${server}/shop/reset-password-seller/${token}`, { password });
      toast.success(data.message);
      navigate("/shop-login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordSeller;
