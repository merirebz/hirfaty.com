
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa";
import { footerSupportLinks, categoriesData } from "../../static/data";
import logo from "../../Assests/llgg.png";
import { useTranslation } from "react-i18next";
import CMILogo from "../../Assests/image/CMI-PY.png";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSending, setisSending] = useState(false);

  const handleSubmit = (e) => {
    setisSending(true);
    e.preventDefault();

    axios
      .post(`${server}/news/subscribe`, { email })
      .then((res) => {
        setisSending(false);
        if (res.status === 201) {
          setEmail("");
          toast.success("Subscribed successfully");
        }
      })
      .catch((error) => {
        setisSending(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <footer className="relative font-['Poppins'] bg-[#f8f9fa]">
      
      <img
        src={require("../Layout/img/sattt.png")}
        alt="Satisfaction Guaranteed"
        className="absolute top-4 right-4 w-20 md:w-28 lg:w-36 h-auto z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left place-items-center md:place-items-start">
          
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="mb-4">
              <img src={logo} alt="Harfti Logo" className="w-20 h-auto" />
            </Link>
            <h4 className="text-black text-sm font-semibold mb-2">
            {t("CustomerSupports")}
              
            </h4>
            <a href="tel:+212674042632" className="text-base font-medium text-black">
              +212 674-042632
            </a>
            <a href="mailto:contact@harfti.ma" className="text-base font-medium text-black mt-1">
              contact@harfti.ma
            </a>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/harfti">
                <FaFacebookSquare className="text-black text-xl hover:opacity-70" />
              </a>
              <a href="https://www.instagram.com/harfti.ma/profilecard/?igsh=MWx6ZjgyZGJmbnJxdA%3D%3D">
                <FaInstagram className="text-black text-xl hover:opacity-70" />
              </a>
              <a href="https://www.linkedin.com/company/harfti/">
                <FaLinkedin className="text-black text-xl hover:opacity-70" />
              </a>
              <img src={CMILogo} alt="CMI-PY" className="w-8 h-auto ml-2" />
            </div>
          </div>

       
          <div>
            <h4 className="uppercase text-black text-[16px] font-semibold mb-3">
              {t("TopCategory")}
            </h4>
            <ul className="space-y-2">
              {categoriesData.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.name}`}
                    className="text-sm text-black font-medium capitalize hover:opacity-70"
                  >
                    {t(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h4 className="uppercase text-black text-[16px] font-semibold mb-3">
              {t("Quicklinks")}
            </h4>
            <ul className="space-y-2">
              {footerSupportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.link}
                    className="text-sm text-black font-medium capitalize hover:opacity-70"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="w-full max-w-md">
            <h4 className="text-black text-base font-semibold mb-2 text-center md:text-left">
              {t("Subscribe")}
             
            </h4>
            <p className="text-black text-sm mb-4 text-center md:text-left">
            {t("Get")}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">

<input
        type="email"
        name="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("enterYourEmail")}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md outline-none text-sm w-full"
      /> 
         <button
        type="submit"
        className="px-5 py-2 bg-black text-white text-xs uppercase tracking-wide rounded-md hover:bg-gray-800 transition-all"
      >
        {isSending ? t("sending") : t("subscribe")} 
      </button>
         
            </form>
          </div>
        </div>
      </div>

      
      <div className="py-4 border-t border-gray-300 text-center">
        <p className="text-black text-sm font-normal">
          <span className="uppercase font-semibold hover:opacity-70 cursor-pointer">
            CREATI DIGITAL
          </span>{" "}
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


