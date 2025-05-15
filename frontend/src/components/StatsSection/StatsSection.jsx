


import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitors, setVisitors] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [reviews, setReviews] = useState(0);
  const { t, i18n } = useTranslation();
  
  const targetNumbers = {
    visitors: 2000,
    purchases: 1000,
    reviews: 95,
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, 
    });

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; 
      const intervalTime = 50;
      const steps = duration / intervalTime;

      const increment = {
        visitors: targetNumbers.visitors / steps,
        purchases: targetNumbers.purchases / steps,
        reviews: targetNumbers.reviews / steps,
      };

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;

        setVisitors((prev) => {
          const next = prev + increment.visitors;
          return next >= targetNumbers.visitors ? targetNumbers.visitors : next;
        });

        setPurchases((prev) => {
          const next = prev + increment.purchases;
          return next >= targetNumbers.purchases ? targetNumbers.purchases : next;
        });

        setReviews((prev) => {
          const next = prev + increment.reviews;
          return next >= targetNumbers.reviews ? targetNumbers.reviews : next;
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="stats-section"
      className="w-full bg-gray-100 py-10 text-center rounded-lg shadow-lg"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-4xl font-extrabold mb-5">
          {t("explore")}
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          At <strong>Hirfaty</strong>, each item tells a story of ancestral craftsmanship. Join a vibrant community and be captivated by the authenticity and richness of our marketplace.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold text-orange-500">{visitors}+</h3>
            <p className="text-lg text-gray-600">{t("visitors")}</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500">{purchases}+</h3>
            <p className="text-lg text-gray-600">{t("purchases")}</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-500">{Math.floor(reviews)}%</h3> {/* Display reviews as whole number */}
            <p className="text-lg text-gray-600">{t("reviews")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

