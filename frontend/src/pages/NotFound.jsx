import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import PAGENOTFOUND from "../Assests/image/404.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LiaHomeSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Header />
      <section className=" h-[75vh] flex justify-center items-center flex-col  ">
        <div className=" w-[20rem] ">
          <img src={PAGENOTFOUND} className=" w-full " alt="404PAGENOTFOUND" />
        </div>
        <div className=" flex flex-col justify-center items-center ">
          <h1 className=" text-secondery font-semibold leading-10 text-4xl ">
            404, Page not founds{" "}
          </h1>
          <p className=" w-[25rem] md:w-[30rem] text-center py-6 text-base font-normal  leading-6 text-[#475156] ">
            Something went wrong. It’s look that your requested could not be
            found. It’s look like the link is broken or the page is removed.
          </p>
          <div className=" flex ">
            <button className=" mr-2 px-6 flex items-center bg-main text-white justify-center rounded-sm  text-14 font-bold leading-10 uppercase  ">
              <Link to="/" className=" w-full flex items-center justify-center ">
                <IoIosArrowRoundBack size={25} className=" mr-3 " /> Go Back
              </Link>
            </button>
            <button className=" ml-2 px-5 border-2 text-main border-main  flex items-center justify-center rounded-sm  text-14 font-bold leading-10 uppercase  ">
              <Link to={"/"} className=" w-full flex  ">
                {" "}
                Go To home{" "}
              </Link>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
