import React ,{ useEffect, useState } from 'react'
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Blogs from '../components/Route/Blog/Blogs';
import art from "../Assests/image/art.png"
import ZellijeImage from "../Assests/image/Zellije.jpg"; // Vérifie le bon chemin vers ton image
import { server } from '../server';
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setisSending] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Ajouter un délai pour que l'animation se déclenche au chargement
    setTimeout(() => {
      setIsVisible(true);
    }, 300); // délai de 300ms
  }, []);

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
  return (
    <div>
      <Header activeHeading={6} />
      
      {/* Section image avant les blogs avec animation fade-in */}
      <div className={`relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-in-out`}>
        <img
          src={art}
          alt="Blog Banner"
          className="w-full h-[600px] object-cover transform transition-all duration-1000 ease-in-out hover:scale-105 hover:rotate-2  shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-50">
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {t("Blog de l’Artisanat Marocain")}                

          </h2>
          <p className="text-lg md:text-xl text-white mt-4">
            {t("Tendances & Traditions Marocaines")}        
          </p>
        </div>
      </div>
      <Blogs/>

      <br />
      <br />
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
      <div className="relative z-10 bg-orange-8 rounded-full w-[350px] h-[500px] flex flex-col items-center justify-center mx-auto shadow-lg">
        <h2 className="text-white text-4xl font-bold mt-[-20px]">
          {t("Artisan Spirit")}
          </h2>
      
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
        <form className="flex flex-col items-center w-full"  onSubmit={HandelSubmit}>
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
                    t("Subscribe")
                  )}

            
          </button>
        </form>
      </div>
      
      </div>
      <Footer/>
    </div>
  )
}

export default Blog
