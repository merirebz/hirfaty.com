import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ProfileSidebar = ({ setActive, active }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
 const {user} = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div className="w-full flex rounded-xl items-center my-6 bg-white shadow-sm overflow-y-hidden  p-6 sticky top-0 left-0 ">
      <div
        className="flex items-center cursor-pointer w-full "
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {t('Profile')}
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full "
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {t('Orders')}
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full "
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {('Refunds')}
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full "
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {t('Inbox')}
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full "
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {t('ChangePassword')}
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full "
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "#F1634C" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[#F1634C]" : ""
              } 800px:block hidden`}
            >
              {t('AdminDashboard')}
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full "
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#F1634C" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[#F1634C]" : ""
          } 800px:block hidden`}
        >
          {t('Logout')}
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
