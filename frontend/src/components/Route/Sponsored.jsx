
import React, { useState } from "react";
import brand1 from "../../Assests/image/1.png";
import brand2 from "../../Assests/image/2.png";
import brand3 from "../../Assests/image/3.png";
import brand4 from "../../Assests/image/4.png";

const Sponsored = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const brands = [brand1, brand2, brand3, brand4];

  // Navigate to the next brand (carousel for mobile)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === brands.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the previous brand (carousel for mobile)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brands.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full mx-auto mt-10">
      {/* For Desktop: Grid Layout with Larger Images */}
      <div className="hidden md:grid grid-cols-4 gap-10 px-20">
        {brands.map((brand, index) => (
         
            <img
              src={brand}
              alt={`Brand ${index + 1}`}
              className="w-full max-w-[150px] h-[200px] object-contain"
            />
          
        ))}
      </div>

      {/* For Mobile: Carousel */}
      <div className="relative w-full max-w-[400px] mx-auto md:hidden">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="min-w-full flex justify-center items-center bg-gray-50"
              >
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="w-full max-w-[300px] h-[150px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={prevSlide}
          className="absolute top-[50%] left-4 transform -translate-y-[50%] bg-orange-500 text-white rounded-full p-2 shadow-md hover:bg-orange-600"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-[50%] right-4 transform -translate-y-[50%] bg-orange-500 text-white rounded-full p-2 shadow-md hover:bg-orange-600"
        >
          ❯
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {brands.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-orange-500" : "bg-gray-300"
              } cursor-pointer`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
