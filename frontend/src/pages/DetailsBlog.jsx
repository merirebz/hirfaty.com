import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import BlogDetails from "../components/BlogDetails";

const DetailsBlog = () => {
  const { id } = useParams(); // Récupérer l'ID du blog depuis l'URL

  return (
    <div>
      <Header /> {/* ✅ Inclusion du Header */}
      <div className="container mx-auto p-4">
        <BlogDetails id={id} /> {/* ✅ Affichage du blog */}
      </div>
      <Footer /> {/* ✅ Inclusion du Footer */}
    </div>
  );
};

export default DetailsBlog;
