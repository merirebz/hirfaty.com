import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Blog/BlogCard";
import { getBlogs } from "../../redux/actions/blog"; // Action pour récupérer les blogs
import { useTranslation } from "react-i18next";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs); // Récupérer les blogs depuis Redux
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getBlogs()); // Charger les blogs au premier rendu
  }, [dispatch]);

  console.log("Blogs reçus :", blogs); // Vérifie dans la console si les blogs sont bien chargés

  return (
    <section className=" main-container my-8 ">
      <div className="flex justify-center">
      <div className=" pb-4  flex justify-between items-center w-full ">
        <h1 className=" text-[20px] md:text-[24px] font-semibold leading-8 ">
          {t("Blogs")}
        </h1>
        </div>
      </div>
    <div id="blog" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      ) : (
        <p>Aucun blog trouvé.</p>
      )}
    </div>
    </section>
  );
};

export default Blog;
