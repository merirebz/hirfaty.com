import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import ShopAllOrders from "../../components/Shop/AllOrders";
import { useTranslation } from "react-i18next";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
               
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "MAD " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    // <div className="w-full ">
    //   <h3 className="text-[22px]  ">{t("Overview")}</h3>
      
    //  <div className="flex flex-col md:flex-row  gap-4">
    //     <div className=" mb-4 w-auto h-auto bg-white px-2 py-5">
    //       <div className="flex items-center">
    //         <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`} >
    //           {t("Account Balance")}{" "}
    //           <span className="text-[16px]">(with 10% service charge)</span>
    //         </h3>
    //       </div>
    //       <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
    //         ${availableBalance}
    //       </h5>
    //       <Link to="/dashboard-withdraw-money">
    //         <h5 className="pt-4 pl-[2] text-[#077f9c]">{t("Withdraw Money")}</h5>
    //       </Link>
    //     </div>

    //     <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
    //       <div className="flex items-center">
         
    //         <h3
    //           className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
    //         >
    //           {t("All Orders")}
    //         </h3>
    //       </div>
    //       <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
    //         {orders && orders.length}
    //       </h5>
    //       <Link to="/dashboard-orders">
    //         <h5 className="pt-4 pl-2 text-[#077f9c]">{t("View Orders")}</h5>
    //       </Link>
    //     </div>

    //     <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
    //       <div className="flex items-center">
            
    //         <h3
    //           className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
    //         >
    //           {t("All Products")}
    //         </h3>
    //       </div>
    //       <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
    //         {products && products.length}
    //       </h5>
    //       <Link to="/dashboard-products">
    //         <h5 className="pt-4 pl-2 text-[#077f9c]">{t("View Products")}</h5>
    //       </Link>
    //     </div>
    //   </div>
    //   <br />
    //   <h3 className="text-[22px]">{t("Latest Orders")}</h3>
      
    //     <ShopAllOrders />
       
      
    // </div>
    <div className="w-full px-4 sm:px-6">
  <h3 className="text-[22px] mb-4">{t("Overview")}</h3>

  <div className="flex flex-col md:flex-row md:items-stretch gap-4">
    {/* Account Balance */}
    <div className="w-full md:w-1/3 bg-white px-4 py-5 rounded shadow">
      <h3 className={`${styles.productTitle} text-[18px] font-[400] text-[#00000085]`}>
        {t("Account Balance")} <span className="text-[16px]">(with 10% service charge)</span>
      </h3>
      <h5 className="pt-2 text-[22px] font-[500]">${availableBalance}</h5>
      <Link to="/dashboard-withdraw-money">
        <h5 className="pt-4 text-[#077f9c]">{t("Withdraw Money")}</h5>
      </Link>
    </div>

    {/* All Orders */}
    <div className="w-full md:w-1/3 bg-white px-4 py-5 rounded shadow">
      <h3 className={`${styles.productTitle} text-[18px] font-[400] text-[#00000085]`}>
        {t("All Orders")}
      </h3>
      <h5 className="pt-2 text-[22px] font-[500]">{orders?.length}</h5>
      <Link to="/dashboard-orders">
        <h5 className="pt-4 text-[#077f9c]">{t("View Orders")}</h5>
      </Link>
    </div>

    {/* All Products */}
    <div className="w-full md:w-1/3 bg-white px-4 py-5 rounded shadow">
      <h3 className={`${styles.productTitle} text-[18px] font-[400] text-[#00000085]`}>
        {t("All Products")}
      </h3>
      <h5 className="pt-2 text-[22px] font-[500]">{products?.length}</h5>
      <Link to="/dashboard-products">
        <h5 className="pt-4 text-[#077f9c]">{t("View Products")}</h5>
      </Link>
    </div>
  </div>

  <br />
  <h3 className="text-[22px]">{t("Latest Orders")}</h3>
  <ShopAllOrders />
</div>

  );
};

export default DashboardHero;
