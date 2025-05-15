

import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LoadingButton from "../Layout/LoadingButton";
import backgroundImage from "../../Assests/image/bg.jpeg"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        toast.success(t("LoginSuccess"));
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div
    
      className="flex items-center justify-center
       min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          {t("SignIn")}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-white">
              {t("Email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              {t("Password")}
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-3 top-3 cursor-pointer text-white"
                  size={24}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-3 top-3 cursor-pointer text-white"
                  size={24}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-white">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {t("RememberMe")}
            </label>
            <Link to="/forgot-password" className="no-underline hover:text-black">
              {t("Forgotyourpassword")}?
            </Link>
          </div>
          <LoadingButton isSending={loading}
           textButton={t("login")}  />
          <div className="text-center text-white">
            <span>{t("Nothaveanyaccount")}</span>
            <Link to="/sign-up" className="text-white-400 pl-2 no-underline hover:text-black">
              {t("SignUp")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;