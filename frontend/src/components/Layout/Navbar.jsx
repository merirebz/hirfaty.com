import React from "react";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";
import { useTranslation } from "react-i18next";

const Navbar = ({ active }) => {
  const { t } = useTranslation();
  return (
    <ul className=" flex 800px:items-center justify-between flex-col 800px:flex-row items-start   w-fit ">
      {navItems &&
        navItems.map((i, index) => (
          <li
            key={index}
            className="flex justify-between items-center ml-3 800px:ml-8 mt-3 mb-3 800px:mt-0 800px:mb-0 "
          >
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#F1634C]" : "text-[#191C1F] "
              }  text-[16px] 800px:text-14 font-[600] leading-5  cursor-pointer hover:text-main }`}
            >
              {t(i.title)}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Navbar;
