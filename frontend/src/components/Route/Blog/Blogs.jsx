import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../../Blog/BlogCard";
import { getBlogs } from "../../../redux/actions/blog"; // Action pour récupérer les blogs

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs } = useSelector((state) => state.blogs); // Récupérer les blogs depuis Redux
  
    useEffect(() => {
      dispatch(getBlogs()); // Charger les blogs au premier rendu
    }, [dispatch]);
  
    console.log("Blogs reçus :", blogs); // Vérifie dans la console si les blogs sont bien chargés
    
    return (
      <div id="blog" className="flex justify-center mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <p>Aucun blog trouvé.</p>
        )}
      </div>
    </div>
    
    );
  };

export default Blogs
