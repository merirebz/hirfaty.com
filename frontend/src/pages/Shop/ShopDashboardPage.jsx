import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
        <div>
         < div className="w-full ">    
          <DashboardHeader /> 
          </div>
          <div className="flex items-start justify-between w-full">
            <div className="w-auto">
              <DashboardSideBar active={1} />
            </div>
            <DashboardHero />
          </div>

        </div>

       

  );
};

export default ShopDashboardPage;
