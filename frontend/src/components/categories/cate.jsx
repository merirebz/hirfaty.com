



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPromoProducts } from "../../redux/actions/promoProducts";
import { backend_url } from "../../server";
import { useTranslation } from "react-i18next";
import {
  GetProductDescription,
  GetProductName,
  GetProductPrice,
  
} from "../../utils/ProductInfo";
 import giftBoxImg from '../categories/img/im1.jpg';
 import { Swiper, SwiperSlide } from "swiper/react";
 import "swiper/css";
 import "swiper/css/navigation";
 import "swiper/css/pagination";
 import { Navigation, Pagination } from "swiper/modules";

 
const Cate = () => {
  const dispatch = useDispatch();
  const { promoProducts } = useSelector((state) => state.promoProducts);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(getPromoProducts());
  }, [dispatch]);

  console.log(promoProducts);

  return (
    
    <div className="bg-gray-100 py-10 px-5">
      {promoProducts && promoProducts.length > 0 ? (
        <div>
          {/* Section avec fond rouge */}
          <div className="grid md:grid-cols-2 gap-5 items-center">
            <div className="p-10">
              <h2 className="text-2xl font-semibold">{t("Hand")}</h2>
              <p className="text-gray-600">{t("Desc")}</p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <Link to="/products">
                <img src={giftBoxImg} alt="Gift Boxes" className="w-full" />
              </Link>
            </div>
          </div>
  
          {/* 🛒 Partie des produits sous forme de Carousel */}
          
          <div className="max-w-[1300px] mx-auto mt-10">
          <h1 className=" text-[20px] md:text-[24px] font-semibold leading-8 ">
          {t("PromoProducts")}
        </h1>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              className="p-5"
            >
              {promoProducts.map((product, index) => (
                <SwiperSlide key={product._id || index}>
                  <div className="w-[100%] max-1300px:w-[45%] max-800px:w-[100%] rounded-2xl h-[auto] max-1300px:h-[350px] p-6 my-5 sm:flex bg-[#fff] m-2">
                    <div className="max-sm:flex justify-center max-sm:w-[100%]">
                    <img
                  src={`${backend_url}${
                    product.images && product.images
                  }`}
                  alt=""
                  loading="lazy"
                  className="w-[90%] rounded-xl h-[170px] object-contain"
                />

                    </div>

                    <div className="max-500px:w-[98%] m-4 mt-7">
                      <h2 className="font-bold text-[20px] text-black">
                        {GetProductName(product, i18n).length > 70
                          ? GetProductName(product, i18n).slice(0, 70) + "..."
                          : GetProductName(product, i18n)}
                      </h2>
                      <div className=" text-[#929FA5] text-[12px] leading-5 line-through ">
                   {GetProductPrice(product, i18n)}MAD
                      </div>
                      <h4 className=" text-14 font-semibold ml-1   text-main mb-4 leading-5 ">
                <meta itemProp="price" content={product.discountPrice} />
                {product.discountPrice} MAD
              </h4>
                      
                      <h3 className="text-[14px] text-[#797979]">
                        {GetProductDescription(product, i18n).length > 70
                          ? GetProductDescription(product, i18n).slice(0, 70) + "..."
                          : GetProductDescription(product, i18n)}
                      </h3>
                      <div>
                        <Link to={`/product/${product._id}`}>
                          <h1 className="bg-[#0f0f0f] w-[70%] mt-3 p-3 justify-center rounded-md text-[#FFF] flex items-center">
                            {t("SeeMore")}
                          </h1>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : null}
    </div>
  );
}


export default Cate;



// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getPromoProducts } from "../../redux/actions/promoProducts";
// import { backend_url } from "../../server";
// import { useTranslation } from "react-i18next";
// import {
//   GetProductDescription,
//   GetProductName,
// } from "../../utils/ProductInfo";

// const Cate = () => {
//   const dispatch = useDispatch();
//   const { promoProducts } = useSelector((state) => state.promoProducts);
//   const { t, i18n } = useTranslation();

//   useEffect(() => {
//     dispatch(getPromoProducts());
//   }, [dispatch]);
  
//   useEffect(() => {
//     if (promoProducts?.length > 0) {
//       console.log("promoProducts:", promoProducts);
//       console.log("promoProducts[0]:", promoProducts[0]);
//       console.log("promoProducts[0].images:", promoProducts[0]?.images);
//     }
//   }, [promoProducts]);
//   console.log("promoProducts:", promoProducts);

//   return (
//     <div className="flex justify-center ">
//       {promoProducts ? (
//         <div className="w-[98%] 1300px:grid 1300px:grid-cols-3 mt-9 ">
//           {/* {promoProducts.products.length} */}
//           <div className=" w-[95%] col-span-2 max-1300px:col-span-3 rounded-xl h-[auto] flex bg-[#F1634C] m-2">
//             <div className="w-[45%] max-800px:w-[90%]  my-28 m-10">
//               <h1 className="text-[65px] font-bold text-yellow-400">30%</h1>
//               <h2 className="font-bold text-[35px] text-white">
//                 {t("HeroTitile1")}
//               </h2>
//               {/* <h3 className="text-[22px] text-white">            
//               {promoProducts[3].description.length > 200 ? promoProducts[3].description.slice(0, 200) + "..." : promoProducts[3].description}
//                </h3> */}
//               {/* <h4 className="text-[22px] text-white"> {t("HeroTitile1")}</h4> */}
//               <h3 className="text-[22px] text-white">
//                 {" "}
//                 {t("HeroDescription")}
//               </h3>

//               <div>
//                 <Link to={`${`/product/${promoProducts[0]._id}`}`}>
//                   <h1 className="bg-[#fff] w-[70%] p-3 justify-center rounded-md mt-8 text-[#F1634C] flex items-center">
//                     {t("SeeMore")}
//                   </h1>
//                 </Link>
//               </div>
//             </div>
           
//           </div>
//           <div className="max-1300px:flex justify-center max-1300px:flex-wrap ">
//             <div className=" w-[100%] max-1300px:w-[45%] max-800px:w-[100%]  rounded-2xl h-[auto] max-1300px:h[350px] p-6 my-5 sm:flex bg-[#fff] m-2">
//               <div className=" max-sm:flex justify-center max-sm:w-[100%]">
//                 <img
//                   src={`${backend_url}${
//                     promoProducts[0].images && promoProducts[0].images[0]
//                   }`}
//                   alt=""
//                   loading="lazy"
//                   className="w-[90%] rounded-xl h-[170px] object-contain"
//                 />
//               </div>
//               <div className=" max-500px:w-[98%] m-4 mt-7">
//                 <h2 className="font-bold text-[20px] text-black">
//                   {GetProductName(promoProducts[0], i18n).length > 70
//                     ? GetProductName(promoProducts[0], i18n).slice(0, 70) +
//                       "..."
//                     : GetProductName(promoProducts[0], i18n)}
//                 </h2>
//                 <h3 className="text-[14px] text-[#797979]">
//                   {GetProductDescription(promoProducts[0], i18n).length > 70
//                     ? GetProductDescription(promoProducts[0], i18n).slice(
//                         0,
//                         70
//                       ) + "..."
//                     : GetProductDescription(promoProducts[1], i18n)}
//                 </h3>
//                 <div>
//                   <Link to={`${`/product/${promoProducts[1]._id}`}`}>
//                     <h1 className="bg-[#F1634C] w-[90%] mt-3 p-3 justify-center rounded-md  text-[#FFF] flex items-center">
//                       {t("SeeMore")}
//                     </h1>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className=" w-[100%] max-1300px:w-[45%] max-800px:w-[100%]  rounded-2xl h-[auto] max-1300px:h[350px] p-6 my-5 sm:flex bg-[#fff] m-2">
//               <div className=" max-sm:flex justify-center max-sm:w-[100%]">
//                 <img
//                   src={`${backend_url}${
//                     promoProducts[1].images && promoProducts[1].images[0]
//                   }`}
//                   alt=""
//                   loading="lazy"
//                   className="w-[90%] rounded-xl h-[170px] object-contain"
//                 />
//               </div>
//               <div className=" max-500px:w-[98%] m-4 mt-7">
//                 <h2 className="font-bold text-[20px] text-black">
//                   {GetProductName(promoProducts[1], i18n).length > 70
//                     ? GetProductName(promoProducts[1], i18n).slice(0, 70) +
//                       "..."
//                     : GetProductName(promoProducts[1], i18n)}
//                 </h2>
//                 <h3 className="text-[14px] text-[#797979]">
//                   {GetProductDescription(promoProducts[1], i18n).length > 70
//                     ? GetProductDescription(promoProducts[1], i18n).slice(
//                         0,
//                         70
//                       ) + "..."
//                     : GetProductDescription(promoProducts[1], i18n)}
//                 </h3>
//                 <div>
//                   <Link to={`${`/product/${promoProducts[1]._id}`}`}>
//                     <h1 className="bg-[#F1634C] w-[90%] mt-3 p-3 justify-center rounded-md  text-[#FFF] flex items-center">
//                       {t("SeeMore")}
//                     </h1>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default Cate;