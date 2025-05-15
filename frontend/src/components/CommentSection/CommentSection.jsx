
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import s1 from "./s1.png";
import s3 from "./s3.png";
import s4 from "./s4.png";
import s6 from "./s6.png";
import s7 from "./s7.png";

const images = { s1, s3, s4, s6, s7 };
const StarRating = ({ count }) => (
  <div className="text-center text-yellow-400 mb-2">
    {Array(count)
      .fill()
      .map((_, i) => (
        <span key={i} className="text-lg">★</span>
      ))}
  </div>
);

const CustomerReviews = () => {
  const { t } = useTranslation();
  const reviews = t("Reviews", { returnObjects: true });

  return (
    <div className="bg-white py-16 px-6 text-black text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8">
        {t("ReviewsSectionTitle")}
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="mb-12 bg-white shadow-md rounded-xl px-6 py-8 border border-gray-100 h-[300px] flex flex-col justify-between items-center mx-auto max-w-sm">
              <div>
                <StarRating count={review.rating} />
                <p className="text-sm mb-4 whitespace-pre-line">{review.text}</p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={images[review.image] || s1}
                  alt={review.name}
                  className="w-24 h-24 object-contain mb-4"
                />
                <div>
                  <h4 className="font-bold text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.location}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviews;

