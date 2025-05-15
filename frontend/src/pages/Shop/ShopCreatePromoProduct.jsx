import React from 'react'
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import CreatePromoProduct from "../../components/Shop/CreatePromoProduct"
const ShopCreatePromoProduct = () => {
  return (
    <div>
       <DashboardHeader />
      <div className="flex pt-5 overflow-hidden ">
        <DashboardSideBar active={4} stylesCss={"!w-[25%] fixed "} />
        <div className="relative w-full h-full overflow-y-auto   ">
          <main className=" flex justify-center w-full pb-5 ">
            <CreatePromoProduct/>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ShopCreatePromoProduct
