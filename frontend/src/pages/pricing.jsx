import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import PricingCard from "../components/Route/Pricing/PricingCard";
const Pricing = () => {
  const { t } = useTranslation();

  const [planSwitch, setPlanSwitch] = useState("monthly");

  const planData = [
    {
      linkPay: "#",
      listPlan: [
        t("Platform Access"),
        `3 ${t("DAYS")} - ${t("Distance Learning/Remote Training")} `,
        t("Customer Support"),
      ],
      titlePlane: t("Free pack"),
      pricePlane: planSwitch === "monthly" ? 0 : 0,
      planeTime: planSwitch === "monthly" ? t("Monthly") : t("Annual"),
    },
    {
      linkPay: "#",
      listPlan: [
        t("Platform Access"),
        ` ${t("Distance Learning/Remote Training")} -  ${t("All time")}`,
        t("Support/Guidance"),
        t("Branding"),
        t("Customer Support"),
      ],
      titlePlane: t("Bronze pack"),
      pricePlane: planSwitch === "monthly" ? 300 : 3000,
      planeTime: planSwitch === "monthly" ? t("Monthly") : t("Annual"),
    },
    {
      linkPay: "#",
      listPlan: [
        t("Platform Access"),
        `  ${t("Distance Learning/Remote Training")} - ${t("All time")} `,
        t("Support/Guidance"),
        t("Branding"),
        t("Store Management"),
        t("Customer Support"),
      ],
      titlePlane: t("Silver pack"),
      pricePlane: planSwitch === "monthly" ? 800 : 5000,
      planeTime: planSwitch === "monthly" ? t("Monthly") : t("Annual"),
    },
    {
      linkPay: "#",
      listPlan: [
        t("Platform Access"),
        ` ${t("Distance Learning/Remote Training")} - ${t("All time")}  `,
        t("Support/Guidance"),
        t("Branding"),
        t("Store Management"),
        t("Customer Support"),
        t("Social Media Management"),
        // t("Promotional Video"),
        t("In-person Training"),
        t("Ad Activation"),
        t("Platform Positioning"),
      ],
      titlePlane: t("Gold pack"),
      pricePlane: planSwitch === "monthly" ? 1500 : 10000,
      planeTime: planSwitch === "monthly" ? t("Monthly") : t("Annual"),
    },
  ];

  return (
    <>
      <Header />
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
              Our plans for your strategies
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl ">
              See below our main three plans for your business, for your startup
              and agency. It start from here! You can teach yourself what you
              really like.
            </p>
          </div>

          {/* Plan switch Button */}
          <div className="flex items-center justify-center mt-10 space-x-4">
            <span className="text-base font-medium">{t("Monthly")}</span>
            <button
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F1634C]"
              onClick={() => {
                setPlanSwitch(
                  planSwitch === "monthly" ? "annually" : "monthly"
                );
              }}
            >
              <div className="w-16 h-8 transition bg-[#F1634C] rounded-full shadow-md outline-none"></div>
              <div
                className={`absolute ${
                  planSwitch === "monthly" ? "translate-x-0" : "translate-x-8"
                } inline-flex items-center justify-center w-6 h-6 transition-all duration-200 ease-in-out transform bg-white rounded-full shadow-sm top-1 left-1`}
              ></div>
            </button>
            <span className="text-base font-medium">{t("Annual")}</span>
          </div>

          {/* Pracing Card */}
          <div className="space-y-8 lg:grid lg:grid-cols-4 mt-12 sm:gap-3 xl:gap-7 lg:space-y-0">
            {planData.map((plan, idx) => {
              return <PricingCard key={idx} {...plan} />;
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Pricing;
