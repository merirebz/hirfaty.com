




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromoProducts } from "../../../redux/actions/promoProducts";
import z5 from "../Hero/images/z5.jpg";
import z6 from "../Hero/images/az.png";
import z7 from "../Hero/images/z7.jpg";
import z8 from "../Hero/images/z8.jpg";
import z15 from "../Hero/images/z15.png";
import sattt from "../Hero/images/st.png"; 
import { useTranslation } from "react-i18next";

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const dispatch = useDispatch();
  const { promoProducts } = useSelector((state) => state.promoProducts);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getPromoProducts());
  }, [dispatch]);

  if (!promoProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <section className="relative w-full bg-gradient-to-r from-orange-500 via-black to-white py-10 text-white text-center rounded-lg shadow-lg overflow-hidden">

        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            {t("HeroTitile1")}
          </h1>
          <p className="text-md md:text-lg max-w-2xl mx-auto">
            {t("HeroDescription")}
          </p>
        </div>

      </section>

      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="p-4"
      >
        {[z5, z6, z8, z7, z15].map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Promo ${index + 1}`}
              className="w-full h-[200px] sm:h-[300px] object-cover rounded-xl shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            color: #ff5722;
          }
          .swiper-pagination-bullet {
            background-color: #4caf50;
          }
          .swiper-pagination-bullet-active {
            background-color: #ff9800;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
