// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Importer i18next
// import { backend_url } from "../../server";

// const BlogCard = ({ blog }) => {
//   const { i18n } = useTranslation(); // Obtenir la langue actuelle
//   const lang = i18n.language || "fr"; // Utiliser "fr" par défaut

//   // Récupérer le titre et le contenu dans la langue active avec une valeur par défaut
//   const title = blog.title[lang] || blog.title.fr || ''; // Utiliser 'fr' ou une chaîne vide si non défini
//   const content = blog.content[lang] || blog.content.fr || ''; // Utiliser 'fr' ou une chaîne vide si non défini

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       {/* Image du blog */}
//       <img
//         src={`${backend_url}${blog.image}`}
//         alt={title} // Utiliser le titre pour l'attribut alt
//         className="w-full h-40 object-cover rounded-md"
//       />

//       {/* Titre du blog */}
//       <h2 className="text-lg font-bold">{title}</h2>

//       {/* Extrait du contenu */}
//       <p className="text-sm text-gray-600">
//         {content && content.length > 100 ? content.slice(0, 100) + "..." : content}
//       </p>

//       {/* Lien vers la page du blog */}
//       <Link to={`/get-blog/${blog._id}`} className="text-blue-500">Lire plus</Link>
//     </div>
//   );
// };

// export default BlogCard;


// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Importer i18next
// import { backend_url } from "../../server";
// import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// const BlogCard = ({ blog }) => {
//   const { i18n } = useTranslation(); // Obtenir la langue actuelle
//   const lang = i18n.language || "fr"; // Utiliser "fr" par défaut

//   // Récupérer le titre et le contenu dans la langue active avec une valeur par défaut
//   const title = blog.title[lang] || blog.title.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
//   const content = blog.content[lang] || blog.content.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
//   const category = blog.category?.[lang] || blog.category?.fr || "";

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       {/* Image du blog */}
//       <div className="relative">
//         <img
//           src={`${backend_url}${blog.image}`}
//           alt={title} // Utiliser le titre pour l'attribut alt
//           className="w-full h-48 object-cover"
//         />
//         {/* Catégorie */}
//         {category && (
//           <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
//             {category}
//           </div>
//         )}
//       </div>
      
//       {/* Contenu */}
//       <div className="p-4">
//         <h2 className="text-lg font-semibold text-gray-800 italic">{title}</h2>
//         <p className="text-sm text-gray-600 mt-2">
//           {content.length > 100 ? content.slice(0, 100) + "..." : content}
//         </p>
        
//         {/* Lien vers la page du blog et icônes sociales */}
//         <div className="mt-4 flex justify-between items-center">
//           <Link to={`/get-blog/${blog._id}`} className="text-blue-500 font-semibold hover:underline">
//             Lire plus
//           </Link>
//           <div className="flex gap-3 text-gray-500 text-sm">
//             <FaInstagram className="hover:text-blue-400 cursor-pointer" />
//             <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
//             <FaLinkedin className="hover:text-blue-400 cursor-pointer" />

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;
// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Importer i18next
// import { backend_url } from "../../server";
// import { FaFacebookF, FaTwitter } from "react-icons/fa";

// const BlogCard = ({ blog }) => {
//   const { i18n } = useTranslation(); // Obtenir la langue actuelle
//   const lang = i18n.language || "fr"; // Utiliser "fr" par défaut

//   // Récupérer le titre et le contenu dans la langue active avec une valeur par défaut
//   const title = blog.title[lang] || blog.title.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
//   const content = blog.content[lang] || blog.content.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
//   const category = blog.category?.[lang] || blog.category?.fr || "";

//   return (
//     <div className="bg-white shadow-lg  overflow-hidden">
//       {/* Image du blog avec catégorie et titre en superposition */}
//       <div className="relative">
//         <img
//           src={`${backend_url}${blog.image}`}
//           alt={title} // Utiliser le titre pour l'attribut alt
//           className="w-full h-48 object-cover"
//         />
//         {/* Catégorie */}
//         {category && (
//           <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
//             {category}
//           </div>
//         )}
//         {/* Titre en bas de l'image */}
//         <div className="absolute bottom-3 left-3 right-3 bg-black bg-opacity-50 text-white text-lg font-semibold italic p-2 rounded-md">
//           {title}
//         </div>
//       </div>
      
//       {/* Contenu */}
//       <div className="p-4">
//         <p className="text-sm text-gray-600 mt-2">
//           {content.length > 100 ? content.slice(0, 100) + "..." : content}
//         </p>
        
//         {/* Lien vers la page du blog et icônes sociales */}
//         <div className="mt-4 flex justify-between items-center">
//           <Link to={`/get-blog/${blog._id}`} className="text-blue-500 font-semibold hover:underline">
//             Lire plus
//           </Link>
//           <div className="flex gap-3 text-gray-500 text-sm">
//             <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
//             <FaTwitter className="hover:text-blue-400 cursor-pointer" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;


import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importer i18next
import { backend_url } from "../../server";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { t } from "i18next";

const BlogCard = ({ blog }) => {
  const { i18n } = useTranslation(); // Obtenir la langue actuelle
  const lang = i18n.language || "fr"; // Utiliser "fr" par défaut

  // Récupérer le titre et le contenu dans la langue active avec une valeur par défaut
  const title = blog.title[lang] || blog.title.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
  const content = blog.content[lang] || blog.content.fr || ""; // Utiliser 'fr' ou une chaîne vide si non défini
  const category = blog.category?.[lang] || blog.category?.fr || "";

  return (
    <div className="bg-white shadow-lg  overflow-hidden w-72 h-auto transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
    {/* Image du blog avec catégorie et titre en superposition */}
    <div className="relative">
      <img
        src={`${backend_url}${blog.image}`}
        alt={title} // Utiliser le titre pour l'attribut alt
        className="w-full h-40 object-cover"
      />
        {/* Catégorie */}
        {category && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {category}
          </div>
        )}
        {/* Titre en bas de l'image */}
        <div className="absolute bottom-3 left-3 right-3 bg-black bg-opacity-50 text-white text-base font-semibold italic p-1 rounded-md">
          {title}
        </div>
      </div>
      
      {/* Contenu */}
      <div className="p-3">
        <p className="text-xs text-gray-600 mt-2">
          {content.length > 80 ? content.slice(0, 80) + "..." : content}
        </p>
        
        {/* Lien vers la page du blog et icônes sociales */}
        <div className="mt-3 flex justify-between items-center">
          <Link to={`/get-blog/${blog._id}`} className="text-black-500 text-xs font-semibold hover:">
            {t("Lire plus")}
          </Link>
          <div className="flex gap-2 text-black-500 text-xs">
            <FaInstagram className="hover:text-black-600 cursor-pointer" />
            <FaFacebookF className="hover:text-black-600 cursor-pointer" />
            <FaLinkedin className="hover:text-black-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
