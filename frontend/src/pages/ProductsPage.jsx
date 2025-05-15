import React from "react";
import { useSelector } from "react-redux";
import Products from "../components/Products/AllProducts.jsx";
import Loader from "../components/Layout/Loader.jsx";

const ProductsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const filteredProducts = allProducts
    ? allProducts.filter((product) => {
        return product.shop.name !== "koton";
      })
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Products allProducts={filteredProducts} />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
