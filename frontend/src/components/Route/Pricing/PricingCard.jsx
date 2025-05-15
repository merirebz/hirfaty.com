import React from "react";
import { Link } from "react-router-dom";

const PricingCard = ({
  linkPay,
  listPlan,
  titlePlane,
  pricePlane,
  planeTime,
}) => {
  return (
    <>
      {/* <!-- Pricing Card --> */}
      <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow ">
        <h3 className="mb-4 text-2xl font-semibold">{titlePlane}</h3>
        {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          Best option for personal use & for your next project.
        </p> */}
        <div className="flex justify-center items-baseline mb-8">
          <span>
            <span className=" text-5xl font-extrabold">{pricePlane} </span>
            <span className=" text-2xl font-bold">MAD</span>
          </span>
          <span className="text-gray-500 font-semibold ">/{planeTime}</span>
        </div>
        {/* <!-- List --> */}
        <ul className="mb-8 space-y-4 text-left">
          {listPlan.map((item, index) => (
            <li key={index} className="flex items-center space-x-3">
              {/* <!-- Icon --> */}
              <svg
                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className=" flex items-end h-full ">
          <Link
            to={linkPay}
            className="text-white w-full bg-[#F1634C] hover:bg-[#d04d39]  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  );
};

export default PricingCard;
