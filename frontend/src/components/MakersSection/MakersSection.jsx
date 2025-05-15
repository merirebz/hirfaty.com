import maker1 from "../MakersSection/img/z10.jpg";
import maker2 from "./img/Z11.jpg";
import maker3 from "./img/Z12.jpg";
import maker4 from "./img/Z13.jpg";
import maker5 from "./img/z14.jpg";
import React from 'react';

import { useTranslation } from "react-i18next";
const MakersSection = () => {
  const images = [maker1, maker2, maker3, maker4, maker5];
const { t, i18n} = useTranslation();
  return (
    <div className="relative w-full">
      {/* Image Container */}
      <div className="flex w-full overflow-hidden">
        {images.map((img, index) => (
          <img key={index} src={img} alt="Maker" className="w-1/5 h-[300px] object-cover" />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
        {t("MakersSection")}
        </h2>
      </div>
    </div>
  );
};

export default MakersSection;
