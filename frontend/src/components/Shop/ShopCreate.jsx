


import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";
import { TypeShopData } from "../../static/data.js";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import LoadingButton from "../Layout/LoadingButton.jsx";
import backgroundImage from "../../Assests/image/bg.jpeg"; 

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [sector, setSector] = useState("");
  const [typeShop, setTypeShop] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    setIsSending(true);
    e.preventDefault();
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("zipCode", zipCode);
    newForm.append("sector", sector);
    newForm.append("typeShop", typeShop);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);

    if (phoneNumber.length < 5) {
      setIsSending(false);
      toast.error(" Please provide a phone number ");
      return false;
    } else if (password.length < 6) {
      console.log(password.length);
      setIsSending(false);
      toast.error("Password must be 6 characters long");
      return false;
    }

    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        setIsSending(false);
        toast.success("Seller Login Success!");
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((error) => {
        setIsSending(false);
        if (error.response.status === 500) {
          toast.error("Internal server error  please try leater  ");
        } else if (error.response.status !== 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            error.response?.data?.message ||
              "Something went wrong please try leater "
          );
        }
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (

   

    <div className="flex items-center justify-center
       min-h-screen bg-cover bg-center flex flex-col justify-center py-12 bg-white" 
    style={{ backgroundImage: `url(${backgroundImage})` }}
    
    >
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 p-8 rounded-lg shadow-lg ">
        <div className=" w-full flex justify-center items-center mb-4 ">
          <h2 className=" text-center text-2xl font-bold text-white mb-6">
            {t("Registerasaseller")}
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              {t("ShopName")}
            </label>
            <div className="mt-1">
              <input
                type="name"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"/>
            </div>
          </div>

<div>
  <label
    htmlFor="phone"
    className="block text-sm font-medium text-white"
  >
    {t("PhoneNumber")}
  </label>
  <div className="mt-1">
    <PhoneInput
      defaultCountry="ma"
      value={phoneNumber}
      onChange={(phone) => setPhoneNumber(phone)}
      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
    />
  </div>
</div>

<div>
  <label
    htmlFor="email"
    className="block text-sm font-medium text-white"
  >
    {t("Email")}
  </label>
  <div className="mt-1">
    <input
      type="email"
      name="email"
      autoComplete="email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
    />
  </div>
</div>

<div>
  <label
    htmlFor="sector"
    className="block text-sm font-medium text-white"
  >
    {t("sector")}
  </label>
  <div className="mt-1">
    <input
      type="text"
      name="sector"
      required
      value={sector}
      onChange={(e) => setSector(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
    />
  </div>
</div>

<div>
  <label
    htmlFor="typeShop"
    className="block text-sm font-medium text-white"
  >
    {t("typeShop")}
  </label>
  <div className="mt-1">
    <select
      value={typeShop}
      required
      onChange={(e) => setTypeShop(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
    >
      <option value="Choose a category"       
      >
        {t("ChooseatypeShop")}
      </option>
      {TypeShopData &&
        TypeShopData.map((i) => (
          <option value={i.title} key={i.id} className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-black bg-opacity-20">
            {t(i.title)}
          </option>
        ))}
    </select>
  </div>
</div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              {t("Address")}
            </label>
            <div className="mt-1">
              <input
                type="address"
                name="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              {t("ZipCode")}
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="zipcode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={visible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {visible ? (
                <AiOutlineEye
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute right-2 top-2 cursor-pointer"
                  size={25}
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-white"
            ></label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    loading="lazy"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>{t("Uploadafile")}</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div>
            <LoadingButton isSending={isSending} textButton={"Create Shop"} />
          </div>
          <div  className="text-center text-white">
            <span>{t("Alreadyhaveanaccount")}</span>
            <Link to="/shop-login" className="text-white-400 pl-2 no-underline hover:text-black">
              {t("Signin")}
            </Link>
          </div>
        </form>
      </div>

       {/* Section promotionnelle */}
    <div className="w-full bg-[#F1634C] mt-8">
      <div className="2xl:container 2xl:mx-auto lg:py-14 lg:px-20 md:py-10 md:px-6 py-9 px-4">
        <div className="w-full flex flex-col justify-center items-center lg:flex-row">
          <p className="text-white text-center sm:mr-3 mr-0">
            Join Harfti and be part of the e-commerce revolution. Discover how our
          </p>
          <Link to={"/pricing"}>
            <button className="text-md mt-4 lg:mt-0 bg-[#00000042] py-2 px-4 rounded-full text-white font-semibold">
              Start Your Now
            </button>
          </Link>
        </div>
      </div>
    </div>
</div>


  );
};

export default ShopCreate;