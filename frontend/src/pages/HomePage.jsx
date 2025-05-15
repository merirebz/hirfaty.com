import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import CategoryFilter from "../components/filtercategory/CategoryFilter"

import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import Blog from "../components/Blog/Blog";
import Cate from "../components/categories/cate";
import WhyChooseHirfaty from "../components/WhyChooseHirfaty/WhyChooseHirfaty.jsx";
import MakersSection from "../components/MakersSection/MakersSection";
import StatsSection from "../components/StatsSection/StatsSection";
import CommentSection from "../components/CommentSection/CommentSection"
const HomePage = () => {
  return (
    <div className="  ">
      <Header activeHeading={1} />
      <Hero />
      <Sponsored />
      <CategoryFilter />

      <Cate />
       <WhyChooseHirfaty/>
      <MakersSection/>
      <br />
      <StatsSection/>
      
      <FeaturedProduct />
      
      
      <CommentSection />
      <Blog/>
      <Footer />
    </div>
  );
};

export default HomePage;
