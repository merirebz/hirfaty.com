

import React from 'react';
import { CheckCircle, Heart, Lock, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const icons = [
  <CheckCircle size={32} className="text-indigo-500" />,
  <Heart size={32} className="text-pink-500" />,
  <Lock size={32} className="text-green-500" />,
  <BarChart2 size={32} className="text-yellow-500" />
];

const WhyChooseHirfaty = () => {
  const { t } = useTranslation();
  const features = t("Features", { returnObjects: true });

  return (
    <section className="py-20 bg-gray-50 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-3xl font-extrabold text-gray-800 mb-4"
      >
        {t("WhyChoose")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        className="text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed text-base"
      >
        {t("WeMake")}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={cardVariants}
            className="flex flex-col items-center text-center bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              className="bg-indigo-50 p-4 rounded-full shadow-sm mb-4 flex items-center justify-center"
            >
              {icons[index]}
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseHirfaty;
