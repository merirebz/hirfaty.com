import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from "react-i18next";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { t } = useTranslation();

  return (
    <section className=" main-container my-8 ">
      <div className=" pb-4  flex justify-between items-center w-full ">
        <h1 className=" text-[20px] md:text-[24px] font-semibold leading-8 ">
          {t("FeaturedProducts")}
        </h1>
        <Link
          to="/products"
          className="text-14 font-medium text-main leading-5  hidden md:flex    justify-center items-center "
        >
          Browse All Products
          <GoArrowRight className=" ml-1" />
        </Link>
      </div>
      <div className="flex justify-center flex-wrap gap-4 mt-5 ">
        {allProducts && allProducts.length !== 0 && (
          <>
            {allProducts.slice(0, 10).map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProduct;
