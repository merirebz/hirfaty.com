import React from "react";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import blankprofile from "../../../Assests/image/blankprofile.webp";
import aboutimage from "../../../Assests/image/at.avif";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="2xl:container 2xl:mx-auto  lg:py-14 lg:px-20 md:py-10 md:px-6 py-9 px-4">
        {/* About Commerce Connect Section */}
        <section
          className=" about-us-section w-full relative h-[500px] bg-cover bg-center bg-no-repeat rounded-lg"
          style={{
            backgroundImage: `url(${aboutimage})`,
          }}
        >
          <span className="absolute z-[1]  block opacity-[0.75] w-full h-[500px] bg-black rounded-lg"></span>

          <div className="absolute z-[2] w-full h-full flex justify-center items-center p-4  ">
            <div className=" flex justify-center items-center flex-col w-full  sm:w-[70%] md:w-[60%] lg:[50%] ">
              <span className="block mb-4 text-[#F1634C] text-md font-semibold text-primary">
                About Us
              </span>
              <h2 className="text-xl font-bold text-white sm:text-3xl">
                {t("AboutCommerceConnectTitle")}
              </h2>
              <p className="mt-4 text-center  text-gray-100 text-lg sm:text-base md:text-lg lg:text-xl">
                {t("AboutCommerceConnect")}
              </p>
            </div>
          </div>
        </section>

        {/* Our Goal Section */}
        <section className=" bg-white mt-16 our-goal-section w-full relative h-[300px] flex justify-center items-center  rounded-lg">
          <div className="w-full  flex  flex-col justify-center items-center pb-8 ">
            <h2 className=" text-[#F1634C] text-3xl font-extrabold  sm:text-3xl">
              {t("OurGoalTitle")}
            </h2>
            <p className="mt-4  text-center  text-gray-700 text-lg sm:text-base w-full  sm:w-[70%] md:w-[60%] lg:[50%]  md:text-lg lg:text-lg">
              {t("OurGoal")}
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="our-team-section  lg:py-14 lg:px-20 md:py-10 md:px-6 py-9 px-4  ">
          <div className="w-full  flex  flex-col justify-center items-center pb-8 ">
            <h2 className=" text-[#F1634C] text-3xl font-extrabold  sm:text-3xl">
              {t("OurTeamTitle")}
            </h2>
            <p className="mt-4  text-center  text-gray-700 text-lg sm:text-base w-full  sm:w-[70%] md:w-[60%] lg:[50%]  md:text-lg lg:text-lg">
              {t("OurTeam")}
            </p>
          </div>
          <div className=" mt-8 flex justify-center flex-wrap gap-[2rem] md:gap-8 sm:gap-8 lg:gap-[10rem] items-center ">
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Salma Harcha</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Sabrina</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Ibrahim Hajiri</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
          </div>
          <div className=" mt-[6rem] flex justify-center flex-wrap gap-[2rem] md:gap-8 sm:gap-8 lg:gap-[10rem] items-center ">
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Kaoutar Zaguir</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Mouad Dadda</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Meryem Bouiz</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <img
                src={blankprofile}
                alt="Team Member 1"
                className="md:w-[12rem] md:h-[12rem] w-[9rem] h-[9rem]  rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold">Hind Jammar</h3>
              {/* <p className="mt-1 text-gray-600">Frontend Developer</p> */}
            </div>
          </div>
        </section>
      </div>
      <div className="w-full bg-[#F1634C] ">
        <div className="2xl:container 2xl:mx-auto  lg:py-14 lg:px-20 md:py-10 md:px-6 py-9 px-4">
          <div className="w-full flex flex-col justify-center items-center  lg:flex-row ">
            <p className=" text-white text-center   sm:mr-3 mr-0 ">
              Join Hirfaty and be part of the e-commerce revolution.
              Discover how our
            </p>
            <Link to={"/pricing"}>
              <button className=" text-md mt-4 lg:mt-0 bg-[#00000042] py-2 px-4 rounded-full  text-white font-semibold ">
                Start Your Nows
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
