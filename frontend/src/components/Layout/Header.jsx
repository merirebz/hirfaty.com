

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown, IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCheck } from "react-icons/md";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { LanguageData } from "../../static/data";
import logo from "../../Assests/llgg.png";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [LangDropdown, setLangDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  let LangValue = LanguageData.find((lang) => lang.value === i18n.language);

  const HandelChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    setLangDropdown(false);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    document.body.className = "";
    switch (i18n.language) {
      case "ar":
        document.body.classList.add("arabic");
        break;
      case "dr":
        document.body.classList.add("arabic");
        break;
      default:
        document.body.classList.add("english");
        break;
    }
  }, [i18n.language]);

  return (
    <>
      <header>
        <div className="items-center bg-black flex">
          <div className="flex justify-between py-1 1000px:py-3 w-full main-container">
            <h1 className="font-normal text-[11px] 800px:text-14 text-white ">
              {t("TheBestWayToBuildYourClotMarketplace")}
            </h1>
            <div className="flex items-center justify-end">
              <div className="800px:flex items-center justify-between hidden pr-6">
                <p className="text-14 text-white">Follow us:</p>
                <a
                  href="https://www.facebook.com/harfti" target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook
                    color="white"
                    width={"16px"}
                    height={"16px"}
                    className="ml-4"
                  />
                </a>
                <a
                  href="https://www.instagram.com/harfti.ma/profilecard/?igsh=MWx6ZjgyZGJmbnJxdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram
                    color="white"
                    width={"16px"}
                    height={"16px"}
                    className="ml-4"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/harfti/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    color="white"
                    width={"16px"}
                    height={"16px"}
                    className="ml-4"
                  />
                </a>
              </div>
              <div className="border-l border-l-white border-opacity-20 pl-6 ">
                <div
                  onClick={() => setLangDropdown(!LangDropdown)}
                  className="cursor-pointer text-[0.75rem] 800px:text-14 text-white flex justify-center items-center "
                >
                  
                  {LangValue ? t(LangValue.title) : t("English")}
                  <IoIosArrowDown className="ml-1" />
                </div>
                <div
                  id="lang-dropdown"
                  className={`${
                    LangDropdown ? "flex" : "hidden"
                  } absolute animate-fade-up animate-once z-50 animate-duration-500 right-4 top-[2rem]  800px:top-[2.5rem] w-44  h-fit  800px:right-16  flex-col items-start bg-white rounded-[3px] pb-[5px] pt-3 border shadow-custom border-[#E4E7E9] `}
                >
                  {LanguageData.map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => HandelChangeLang(lang.value)}
                      className="group flex items-center h-8 mb-3 cursor-pointer w-full justify-evenly"
                    >
                      <img
                        src={lang.img}
                        alt={lang.title}
                        loading="lazy"
                        className="w-8 h-[1.70rem] rounded-full border border-[#E4E7E9] "
                      />
                      <p className="text-14 group-hover:text-black font-medium leading-5 text-[#191C1F] ">
                        {t(lang.title)} 
                      </p>
                      <MdOutlineCheck
                        className={
                          i18n.language === lang.value
                            ? "text-main"
                            : "text-white"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            active === true
              ? "fixed top-0 left-0 z-[666] animate-fade-down animate-once animate-duration-700 "
              : ""
          } border-b-[#EBEBEB] border-b  transition hidden 800px:flex items-center justify-between bg-[#fff] w-full  text-[#797979] h-[90px]`}
        >
          <div className="main-container flex items-center justify-between p-4 w-full ">
            <Link to={"/"}>
              <img
                src={logo}
                alt="Harfti Logo"
                className="w-[100%] h-[100px]"
              />
            </Link>
            <Navbar active={activeHeading} />
            <div className=" flex items-center justify-between   ">
              <div className=" flex justify-between items-center mr-4">
                <div
                  className="relative cursor-pointer mr-5 "
                  onClick={() => setOpenWishlist(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 27 25"
                    fill="none"
                  >
                    <path
                      d="M3.25736 3.36303C0.914213 5.91374 0.914213 10.0493 3.25736 12.6L13.5001 23.75L23.7426 12.6C26.0858 10.0492 26.0858 5.91373 23.7426 3.36303C21.3995 0.81232 17.6005 0.81232 15.2574 3.36303L13.5001 5.27614L11.7426 3.36303C9.3995 0.81232 5.60051 0.81232 3.25736 3.36303Z"
                      stroke="#191C1F"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className=" badge">{wishlist && wishlist.length}</span>
                </div>

                <div
                  className="relative cursor-pointer mr-5"
                  onClick={() => setOpenCart(true)}
                >
                  <svg
                    color="#191C1F"
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="25"
                    viewBox="0 0 23 26"
                    fill="none"
                  >
                    <path
                      d="M16.5 11.9722V6.86111C16.5 4.03832 14.2614 1.75 11.5 1.75C8.73858 1.75 6.5 4.03832 6.5 6.86111V11.9722M2.75 9.41667H20.25L21.5 24.75H1.5L2.75 9.41667Z"
                      stroke="#191C1F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="badge">{cart && cart.length}</span>
                </div>

                <div className="relative cursor-pointer mr-5">
                  {isAuthenticated ? (
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user?.avatar}`}
                        className="w-[35px] h-[35px] rounded-full border-[2px] border-[#0eae88]"
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M4.21021 20.6659C6.80618 19.1986 9.8053 18.3611 13 18.3611C16.1947 18.3611 19.1938 19.1986 21.7898 20.6659M16.8333 10.6944C16.8333 12.8115 15.1171 14.5278 13 14.5278C10.8829 14.5278 9.16667 12.8115 9.16667 10.6944C9.16667 8.57735 10.8829 6.86111 13 6.86111C15.1171 6.86111 16.8333 8.57735 16.8333 10.6944ZM24.5 13.25C24.5 19.6013 19.3513 24.75 13 24.75C6.64873 24.75 1.5 19.6013 1.5 13.25C1.5 6.89873 6.64873 1.75 13 1.75C19.3513 1.75 24.5 6.89873 24.5 13.25Z"
                          stroke="#191C1F"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>

              <button className=" flex justify-center items-center px-5 py-3 rounded bg-black text-white text-14 leading-5 font-medium ">
                <Link to={`${isSeller ? "/shop-create" : "/shop-create"}`}>
                  <p className="text-[#fff] flex items-center">
                    {isSeller ? t("GoDashboard") : t("BecomeSeller")}
                    <IoIosArrowForward className="ml-1" />
                  </p>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div
          className={` ${
            active === true
              ? "shadow-sm fixed top-0 left-0 z-[666] animate-fade-down animate-once animate-duration-500 "
              : null
          } bg-white w-full flex items-center py-2 800px:hidden  border-b-[#EBEBEB] border-b `}
        >
          <div className=" main-container flex items-center justify-between ">
            <div className=" cursor-pointer " onClick={() => setOpen(!open)}>
              <IoIosMenu size={30} />
            </div>
            {/* Logo */}
            <Link to="/">
              <img
                src={logo}
                alt="Harfti Logo"
                className="w-[64px] h-[64px]"
              />
            </Link>
            <div className=" flex items-center ">
              <div
                className="relative cursor-pointer mr-5 "
                onClick={() => setOpenWishlist(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 27 25"
                  fill="none"
                >
                  <path
                    d="M3.25736 3.36303C0.914213 5.91374 0.914213 10.0493 3.25736 12.6L13.5001 23.75L23.7426 12.6C26.0858 10.0492 26.0858 5.91373 23.7426 3.36303C21.3995 0.81232 17.6005 0.81232 15.2574 3.36303L13.5001 5.27614L11.7426 3.36303C9.3995 0.81232 5.60051 0.81232 3.25736 3.36303Z"
                    stroke="#191C1F"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className=" badge">{wishlist && wishlist.length}</span>
              </div>

              <div
                className="relative cursor-pointer mr-5"
                onClick={() => setOpenCart(true)}
              >
                <svg
                  color="#191C1F"
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="22"
                  viewBox="0 0 23 26"
                  fill="none"
                >
                  <path
                    d="M16.5 11.9722V6.86111C16.5 4.03832 14.2614 1.75 11.5 1.75C8.73858 1.75 6.5 4.03832 6.5 6.86111V11.9722M2.75 9.41667H20.25L21.5 24.75H1.5L2.75 9.41667Z"
                    stroke="#191C1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="badge">{cart && cart.length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>


      {open && (
        <>
          <div
            className={` ${
              open ? " block " : "hidden"
            }    fixed  w-[60%] animate-fade-right p-4 animate-once animate-duration-500 bg-white h-screen top-0 left-0 z-[680] `}
          >
            <div className=" flex w-full justify-end ">
              <RxCross2
                onClick={() => setOpen(!open)}
                className=" text-[#191C1F] hover:text-gray-400 cursor-pointer "
                size={23}
              />
            </div>
            <div className=" mt-8 ">
              <Navbar active={activeHeading} />
            </div>
            <div className="mt-8">
              <div className="flex w-full  ">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${backend_url}${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[15px] hover:text-black pr-1  font-[500] leading-5  text-[#000000b7]"
                    >
                      Login
                    </Link>
                    <span className="leading-5">/</span>
                    <Link
                      to="/sign-up"
                      className="text-[15px] hover:text-black font-[500] leading-5 pl-1 text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className=" mt-8 ">
              <button className=" flex justify-center items-center px-5 py-3 rounded bg-black text-white text-14 leading-5 font-medium ">
                <Link to={`${isSeller ? "/shop-create" : "/shop-create"}`}>
                  <p className="text-[#fff] flex items-center">
                    {isSeller ? t("GoDashboard") : t("BecomeSeller")}
                    <IoIosArrowForward className="ml-1" />
                  </p>
                </Link>
              </button>
            </div>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className={` ${
              open ? " block " : "hidden"
            }  animate-fade-right cursor-pointer animate-once animate-duration-100 fixed w-full bg-[#0000005f] z-[670] h-full top-0 left-0`}
          ></div>
        </>
      )}

      {openCart ? <Cart setOpenCart={setOpenCart} /> : ""}
      {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : ""}
         
    </>
  );
};

export default Header;