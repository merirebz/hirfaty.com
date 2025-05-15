
import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import LoadingButton from "../Layout/LoadingButton";
import backgroundImage from "../../Assests/image/bg.jpeg"; 
import { useTranslation } from "react-i18next"; 
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
const { t } = useTranslation();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        setLoading(false);
        toast.success("Signup Successful!");
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
     <div
          className="flex items-center justify-center
           min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
    <div  className="w-full max-w-md bg-white
     bg-opacity-10 backdrop-blur-lg border 
     border-white/20 p-8 rounded-lg shadow-lg">
     
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          {t("SignUp")}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
          <label className="block text-sm font-medium text-white">
              {t("Name")}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
             class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
          
          </div>
          <div className="relative">
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
          <div className="relative">
          <label className="block text-sm font-medium text-white">
              {t("Password")}
            </label>
         
            <input
              type={visible ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            {visible ? (
              <AiOutlineEye className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" size={20} onClick={() => setVisible(false)} />
            ) : (
              <AiOutlineEyeInvisible className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" size={20} onClick={() => setVisible(true)} />
            )}
           
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
           textButton={t("signUp")}  />
          <div className="text-center text-white">
          <span>{t("Alreadyhaveanaccount")}</span>
           <Link to="/login" className="text-white-400 pl-2  no-underline hover:text-black">
           {t("SignIn")}
           </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
