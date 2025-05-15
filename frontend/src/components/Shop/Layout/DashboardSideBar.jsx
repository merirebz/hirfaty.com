import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useTranslation } from "react-i18next";

const DashboardSideBar = ({ active, stylesCss }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full h-[90vh] 800px:m-5 bg-white shadow-sm overflow-y-hidden 800px:p-6 800px:overflow-y-scroll rounded-xl sticky top-0 left-0 z-10 ${stylesCss} `}
    >
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 1 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <RxDashboard size={30} color={`${active === 1 ? "white" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Dashboard")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-orders"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 2 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("All Orders")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-products"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 3 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <FiPackage size={30} color={`${active === 3 ? "white" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("All Products")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 4 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Create Product")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 7 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <CiMoneyBill size={30} color={`${active === 7 ? "white" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Withdraw Money")}
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-promo-product"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 8 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <AiOutlineGift
            size={30}
            color={`${active === 8 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Create Promo Product")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-messages"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 9 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <BiMessageSquareDetail
            size={30}
            color={`${active === 9 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Shop Inbox")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-coupouns"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 10 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <AiOutlineGift
            size={30}
            color={`${active === 10 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Discount Codes")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-refunds"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 11 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 11 ? "white" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Refunds")}
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/settings"
          className={`w-full flex items-center p-3 rounded-xl  ${
            active === 11 ? " bg-[#F1634C] text-white" : "text-[#555]"
          }`}
        >
          <CiSettings size={30} color={`${active === 11 ? "white" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? " text-white" : "text-[#555]"
            }`}
          >
            {t("Settings")}
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
