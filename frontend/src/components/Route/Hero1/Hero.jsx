import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPromoProducts } from "../../../redux/actions/promoProducts";
import { backend_url } from "../../../server";
import { useTranslation } from "react-i18next";
import {
  GetProductDescription,
  GetProductName,
} from "../../../utils/ProductInfo";

const Hero = () => {
  const dispatch = useDispatch();
  const { promoProducts } = useSelector((state) => state.promoProducts);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(getPromoProducts());
  }, [dispatch]);

  if (!promoProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center ">
      <div className="w-[98%] 1300px:grid 1300px:grid-cols-3 mt-9 ">
        <div className=" w-[95%] col-span-2 max-1300px:col-span-3 rounded-xl h-[auto] flex bg-[#F1634C] m-2">
          <div className="w-[45%] max-800px:w-[90%]  my-28 m-10">
            <h1 className="text-[65px] font-bold text-yellow-400">30%</h1>
            <h2 className="font-bold text-[35px] text-white">
              {t("HeroTitile1")}
            </h2>
            <h3 className="text-[22px] text-white">
              {t("HeroDescription")}
            </h3>
            <div>
              <Link to={`/product/${promoProducts[0]?._id}`}>
                <h1 className="bg-[#fff] w-[70%] p-3 justify-center rounded-md mt-8 text-[#F1634C] flex items-center">
                  {t("SeeMore")}
                </h1>
              </Link>
            </div>
          </div>
          <div>
            <img
              src={`${backend_url}${promoProducts[3]?.images?.[0]}`}
              alt=""
              loading="lazy"
              className="m-16  mt-[100px] max-800px:hidden  w-[502px]"
            />
          </div>
        </div>
        <div className="max-1300px:flex justify-center max-1300px:flex-wrap ">
          <div className=" w-[100%] max-1300px:w-[45%] max-800px:w-[100%]  rounded-2xl h-[auto] max-1300px:h[350px] p-6 my-5 sm:flex bg-[#fff] m-2">
            <div className=" max-sm:flex justify-center max-sm:w-[100%]">
              <img
                src={`${backend_url}${promoProducts[0]?.images?.[0]}`}
                alt=""
                loading="lazy"
                className="w-[90%] rounded-xl h-[170px] object-contain"
              />
            </div>
            <div className=" max-500px:w-[98%] m-4 mt-7">
              <h2 className="font-bold text-[20px] text-black">
                {GetProductName(promoProducts[0], i18n).length > 70
                  ? GetProductName(promoProducts[0], i18n).slice(0, 70) + "..."
                  : GetProductName(promoProducts[0], i18n)}
              </h2>
              <h3 className="text-[14px] text-[#797979]">
                {GetProductDescription(promoProducts[0], i18n).length > 70
                  ? GetProductDescription(promoProducts[0], i18n).slice(0, 70) + "..."
                  : GetProductDescription(promoProducts[1], i18n)}
              </h3>
              <div>
                <Link to={`/product/${promoProducts[1]?._id}`}>
                  <h1 className="bg-[#F1634C] w-[90%] mt-3 p-3 justify-center rounded-md  text-[#FFF] flex items-center">
                    {t("SeeMore")}
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className=" w-[100%] max-1300px:w-[45%] max-800px:w-[100%]  rounded-2xl h-[auto] max-1300px:h[350px] p-6 my-5 sm:flex bg-[#fff] m-2">
            <div className=" max-sm:flex justify-center max-sm:w-[100%]">
              <img
                src={`${backend_url}${promoProducts[1]?.images?.[0]}`}
                alt=""
                loading="lazy"
                className="w-[90%] rounded-xl h-[170px] object-contain"
              />
            </div>
            <div className=" max-500px:w-[98%] m-4 mt-7">
              <h2 className="font-bold text-[20px] text-black">
                {GetProductName(promoProducts[1], i18n).length > 70
                  ? GetProductName(promoProducts[1], i18n).slice(0, 70) + "..."
                  : GetProductName(promoProducts[1], i18n)}
              </h2>
              <h3 className="text-[14px] text-[#797979]">
                {GetProductDescription(promoProducts[1], i18n).length > 70
                  ? GetProductDescription(promoProducts[1], i18n).slice(0, 70) + "..."
                  : GetProductDescription(promoProducts[1], i18n)}
              </h3>
              <div>
                <Link to={`/product/${promoProducts[1]?._id}`}>
                  <h1 className="bg-[#F1634C] w-[90%] mt-3 p-3 justify-center rounded-md  text-[#FFF] flex items-center">
                    {t("SeeMore")}
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
