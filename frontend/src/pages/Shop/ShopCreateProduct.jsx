import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex pt-5 overflow-hidden ">
        <DashboardSideBar active={4} stylesCss={"!w-[25%] fixed "} />
        <div className="relative w-full h-full overflow-y-auto   ">
          <main className=" flex justify-center w-full pb-5 ">
            <CreateProduct />
          </main>
        </div>
      </div>
    </>
  );
};

export default ShopCreateProduct;
