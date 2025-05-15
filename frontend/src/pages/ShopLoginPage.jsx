import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller, navigate]);
  return (
    <>
      <Header />
      <ShopLogin />
      <Footer />
    </>
  );
};

export default ShopLoginPage;
