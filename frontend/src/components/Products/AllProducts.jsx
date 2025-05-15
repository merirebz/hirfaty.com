import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import ProductCard from "../Route/ProductCard/ProductCard";
import Pagination from "../Layout/pagination";
import { categoriesData } from "../../static/data.js";
import { useTranslation } from "react-i18next";

const Products = ({ allProducts }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [priceForm, setPriceForm] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState({
    name: "",
    id: 0,
  });
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;

  // Calculate the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Get the current posts to display
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategorie = (e) => {
    const { value } = e.target;
    if (value === "Choose a category") {
      setCategory("");
      setSelectedCategorie("");
    } else {
      let newcategory = {};
      newcategory.name = categoriesData[value - 1].name;
      newcategory.id = value;
      setCategory(value);
      setSelectedCategorie(newcategory);
    }
  };

  const handleSubCategorie = (e) => {
    if (e.target.value === "Choose a Subcategory") {
      setSubCategory(null);
    } else {
      setSubCategory(e.target.value);
    }
  };

  useEffect(() => {
    let productFiltred = allProducts;
    if (category) {
      if (productFiltred.length > 0) {
        productFiltred =
          productFiltred &&
          productFiltred.filter((i) => {
            try {
              let Jsoncategory = JSON.parse(i.category);
              return (
                Jsoncategory?.id === category ||
                Jsoncategory?.name === category ||
                i.category === category
              );
            } catch (error) {
              console.error("Invalid JSON:", i.category);
              return true;
            }
          });
      }
    }
    if (subCategory) {
      if (productFiltred.length > 0) {
        productFiltred =
          productFiltred &&
          productFiltred.filter((i) => i.subCategory === subCategory);
      }
    }
    if (priceForm) {
      if (productFiltred.length > 0) {
        productFiltred =
          productFiltred &&
          productFiltred.filter((i) => i.originalPrice >= priceForm);
      }
    }
    if (priceTo) {
      if (productFiltred.length > 0) {
        productFiltred =
          productFiltred &&
          productFiltred.filter((i) => i.originalPrice <= priceTo);
      }
    }
    setData(productFiltred);
  }, [priceForm, category, priceTo, subCategory, allProducts]);

  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className="">
          <div className="mx-5 mb-5 rounded-xl bg-white">
            <div className="flex p-4 flex-wrap">
              <div className=" p-2 ">
                <h1 className="text-[15px] font-bold">{t("Pricerange")} </h1>
                <input
                  type="text"
                  value={priceForm}
                  onChange={(e) => setPriceForm(e.target.value)}
                  placeholder={t("Pricefrom")}
                  className="border-2 w-[50%] p-1 rounded-lg mt-2 "
                />
                <input
                  type="text"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                  placeholder={t("Priceto")}
                  className="border-2 w-[40%] mx-1 p-1 rounded-lg mt-2"
                />
              </div>
              <div className=" p-2 ">
                <label className="pb-2 font-bold">
                  {t("category")} <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                  value={category}
                  onChange={handleCategorie}
                >
                  <option value="Choose a category">
                    {t("Chooseacategory")}
                  </option>
                  {categoriesData &&
                    categoriesData.map((i) => (
                      <option value={i.id} key={i.id}>
                        {t(i.name)}
                      </option>
                    ))}
                </select>
              </div>
              {selectedCategorie.id !== 0 ? (
                <div className=" p-2 ">
                  <label className="pb-2 font-bold">
                    Sub category <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full mt-2 border h-[35px] rounded-[5px]"
                    onChange={handleSubCategorie}
                  >
                    <option value="Choose a Subcategory">
                      {t("ChooseaSubcategory")}
                    </option>
                    {categoriesData[selectedCategorie.id - 1]
                      ? categoriesData[
                          selectedCategorie.id - 1
                        ].subcategories.map((i, index) => (
                          <option value={i} key={index}>
                            {t(i)}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* mobile filter */}
          <div className=" w-[100%]">
            <div className="flex justify-center flex-wrap gap-4">
              {currentPosts &&
                currentPosts.map((i, index) =>
                  i.shop.name === "koton" ? (
                    ""
                  ) : (
                    <ProductCard data={i} key={index} />
                  )
                )}
            </div>
            {currentPosts && currentPosts.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                {t("NoproductsFound")}
              </h1>
            ) : null}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(data.length / postsPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;
