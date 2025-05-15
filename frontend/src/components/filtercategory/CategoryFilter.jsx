import React from "react";
import { categoriesData } from "../../static/data"; // adjust the path as needed
import shoee from "../filtercategory/image/babouche.jpg"
import clothingand from "../filtercategory/image/cloths.jpeg"
import bio from "../filtercategory/image/health.jpg"
import home from "../filtercategory/image//kitt.jpg"
import accessories from "../filtercategory/image/upac.jpeg"
import local from "../filtercategory/image/local.jpg"
import { useTranslation} from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const imageMap = {
  BeautyandHealth: bio,
  Clothingand: clothingand,
  Shoes: shoee,
  Accessories: accessories ,
  HomeandKitchen: home ,
  LocalProducts: local,
};

const CategoryFilter = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClick = (cat) => {
        navigate(`/category/${cat.name}`);
      };
    return (
        <div style={styles.container}>
          <h2 style={styles.heading}>{t("Popular Categories")}</h2>
          <div style={styles.grid}>
            {categoriesData.map((cat) => (
              <motion.div
                key={cat.id}
                style={styles.card}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: cat.id * 0.1 }}
                 onClick={() => handleClick(cat)}
              >
                <img
                  src={imageMap[cat.name] || "https://via.placeholder.com/120"}
                  alt={cat.name}
                  style={styles.image}
                />
                <span style={styles.label}>{t(cat.name)}</span>
                
              </motion.div>
            ))}
          </div>
        </div>
      );
    };
    
    const styles = {
      container: {
        textAlign: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      },
      heading: {
        marginBottom: "30px",
        fontSize: "28px",
        fontWeight: "bold",
      },
      grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "40px",
      },
      card: {
        width: "150px",
        textAlign: "center",
        cursor: "pointer",
        transition: "box-shadow 0.3s",
      },
      image: {
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #ccc",
        transition: "transform 0.3s ease",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      },
      label: {
        display: "block",
        marginTop: "10px",
        fontWeight: "bold",
        fontSize: "14px",
      },
      subcategories: {
        marginTop: "8px",
        fontSize: "12px",
        color: "#555",
      },
      subItem: {
        margin: "2px 0",
      },
    };

export default CategoryFilter;
