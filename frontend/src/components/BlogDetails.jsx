

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { backend_url, server } from "../server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ZellijeImage from "../Assests/image/Zellije.jpg"; 
import { toast } from "react-toastify";
import axios from "axios";

const BlogDetails = ({ id }) => {
  const { i18n,t } = useTranslation();
  const lang = i18n.language || "fr"; 

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isSending, setisSending] = useState(false);

  const HandelSubmit = (e) => {
    setisSending(true);
    e.preventDefault();

    axios
      .post(`${server}/news/subscribe`, { email })
      .then((res) => {
        setisSending(false);
        if (res.request.status === 201) {
          setEmail("");
          toast.success("Subscribed successfully");
          setEmail("");
        }
      })
      .catch((error) => {
        setisSending(false);
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${server}/blogs/get-blog/${id}`);
        if (!response.ok) {
          throw new Error("Blog non trouvé");
        }
        const data = await response.json();
        console.log("Données reçues :", data);
        setBlog(data.blog);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;
  if (!blog) return <p className="text-center text-gray-600">Blog non trouvé</p>;

 
  const title = blog.title?.[lang] || blog.title?.fr || "Titre indisponible";
  const content = blog.content?.[lang] || blog.content?.fr || "Aucun contenu disponible";
  const imageUrl = blog.image ? `${backend_url}${blog.image}` : null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 mt-0 space-y-8">
             
    
      {imageUrl ? (
        <div className="relative w-screen max-w-10xl  ">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[400px] object-cover transform transition-all duration-1000 ease-in-out hover:scale-105 hover:rotate-2 rounded-lg shadow-lg "
            />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl font-bold text-center px-4">{title}</h1>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Aucune image disponible</p>
      )}
     
   
     <nav className="w-full max-w-4xl text-sm text-gray-700 mb-6 flex justify-center items-center">
     <span className="font-semibold">HOME</span>
        <span className="mx-2 text-orange-600 text-xs">▶</span>
        <span className="mx-2 text-orange-600 text-xs">▶</span>
        <span className="text-gray-900 font-bold">{title}</span>
      </nav>
      {/* Contenu du blog */}
      <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-md mt-6">
        <p className="text-black-700 leading-relaxed text-justify">{content}</p>
      </div>

      <h3 className="text-center text-xl font-semibold mt-4">{t("Share this article")}</h3>

      {/* Section de partage */}
      <div className="flex justify-center space-x-4 mt-6">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black-600 text-black p-3 rounded-full hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black-400 text-black p-3 rounded-full hover:bg-blue-500"
        >
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a
          href={`https://wa.me/?text=${title} - ${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black-500 text-black p-3 rounded-full hover:bg-green-600"
        >
          <FontAwesomeIcon icon={faWhatsapp} size="lg" />
        </a>
      </div>

   {/* Section de Newsletter avec image de fond */}
   <div 
      className="relative w-screen h-auto min-h-screen flex items-center justify-center overflow-hidden shadow-xl"
      style={{ 
        backgroundImage: `url(${ZellijeImage})`, // Assurez-vous que ZellijeImage est bien importé
        backgroundSize: "cover", 
        backgroundPosition: "right", // Déplace l’image vers la droite
        backgroundRepeat: "no-repeat" 
      }}
    >
  {/* Overlay pour améliorer la lisibilité */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Section de la newsletter */}
<div className="relative z-10 bg-orange-8`  00 rounded-full w-[350px] h-[500px] flex flex-col items-center justify-center mx-auto shadow-lg ">
  <h2 className="text-white text-4xl font-bold mt-8">{t("Artisan Spirit")}</h2>

  {/* Réseaux sociaux */}
  <div className="flex space-x-4 mb-4 text-white">
    <span className="cursor-pointer"><i className="fab fa-instagram"></i></span>
    <span className="cursor-pointer"><i className="fab fa-pinterest"></i></span>
    <span className="cursor-pointer"><i className="fab fa-facebook"></i></span>
    <span className="cursor-pointer"><i className="fab fa-youtube"></i></span>
    <span className="cursor-pointer"><i className="fab fa-twitter"></i></span>
    <span className="cursor-pointer"><i className="fab fa-tiktok"></i></span>
  </div>

  {/* Message */}
  <p className="text-white mb-4 text-center">{t("Stay informed on our latest news!")}</p>

  {/* Formulaire de Newsletter */}
  <form className="flex flex-col items-center w-full"onSubmit={HandelSubmit}>
    {/* Champ email */}
    <input
      type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder='Enter you email here'
            className="px-4 py-2 rounded-full mb-4 focus:outline-none w-[250px] placeholder:text-center"
    />
    
    {/* Bouton d'envoi */}
    <button 
      type="submit"
      className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300"
    >
      {isSending ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                   t( "Subscribe")
                  )}
    </button>
  </form>
</div>

</div>

    </div>
    
  );
};

export default BlogDetails;
