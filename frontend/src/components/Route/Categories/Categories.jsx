import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faEye,
  faDog,
  faGift,
  faShoePrints,
  faChildReaching,
} from "@fortawesome/free-solid-svg-icons";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const Categories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?category=${i}`);
  };
  return (
    <>
      <div className="flex justify-center h-[280px] bg-white my-10">
        <Carousel responsive={responsive} className=" w-[85%] ">
          {/* <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faPowerOff}
              onClick={() => handleSubmit("Computers and Laptops")}
              className="text-[80px] my-3  w-[100%]"
            />{" "}
            {t("ComputersandLaptops")}
          </div> */}
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faChildReaching}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("cosmetics and body care")}
            />{" "}
            {t("cosmeticsandbodycare")}
          </div>
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faShirt}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Cloths")}
            />
            {t("Cloths")}
          </div>
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faShoePrints}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Shoes")}
            />
            {t("Shoes")}
          </div>
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faGift}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Gifts")}
            />
            {t("Gifts")}
          </div>
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faDog}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Pet Care")}
            />
            {t("PetCare")}
          </div>
          {/* <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faMobile}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Mobile and Tablets")}
            />
            {t("MobileandTablets")}
          </div> */}
          <div className="bg-white m-5  text-[#A3AEBE] font-bold text-center w-[98%]">
            <FontAwesomeIcon
              icon={faEye}
              className="text-[90px] my-3  w-[100%]"
              onClick={() => handleSubmit("Others")}
            />
            {t("Others")}
          </div>
        </Carousel>
        ;
      </div>
    </>
  );
};

export default Categories;
