// import React, { useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { useDispatch } from "react-redux";
// import { createBlog } from "../../../redux/actions/blog";
// import Loader from "../../Layout/Loader";
// import { useSelector } from "react-redux";

// const CreateBlog = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user); // Récupérer l'utilisateur connecté

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState([]);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState(null);

//   const handleTagsChange = (e) => {
//     const value = e.target.value;
//     const newTags = value
//       .split(",")
//       .map((tag) => tag.trim())
//       .filter((tag) => tag.length > 0);
//     setTags(newTags);
//   };

//   // Gestion de l'image avec validation (max 5MB)
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       alert("L'image doit être inférieure à 5MB !");
//       return;
//     }

//     setImage(file);

//     // Création d'un aperçu de l'image
//     const reader = new FileReader();
//     reader.onloadend = () => setPreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // Suppression de l'image avant envoi
//   const removeImage = () => {
//     setImage(null);
//     setPreview(null);
//   };
// // Fonction pour réinitialiser le formulaire
// const resetForm = () => {
//   setTitle("");
//   setContent("");
//   setCategory("");
//   setTags([]);
//   setImage(null);
//   setPreview(null);
// };
//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!image) {
//       alert("Veuillez ajouter une image !");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("category", category);
//     formData.append("tags", tags);
//     formData.append("author", user._id);

//     try {
//       await dispatch(createBlog(formData));
//       alert("Blog créé avec succès !");
//       resetForm(); // Réinitialisation après succès
//       setPreview(null);
//     } catch (error) {
//       alert("Erreur lors de la création du blog !");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="pb-8 px-10 mt-10 bg-white border w-[70%] border-gray-200 rounded-lg shadow-sm">
//           <h5 className="text-xl py-4 font-semibold text-gray-900 sm:text-2xl">
//             Create Blog Post
//           </h5>

//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             {/* Champ Title */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium text-gray-900">
//                 Blog Title
//                 <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={title}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter your blog title..."
//               />
//             </div>

//             {/* Champ Content */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium text-gray-900">
//                 Blog Content
//                 <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 required
//                 rows="8"
//                 name="content"
//                 value={content}
//                 className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Enter your blog content..."
//               />
//             </div>

//             {/* Champ Category */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium text-gray-900">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 name="category"
//                 value={category}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder="Enter your category..."
//               />
//             </div>

//             {/* Champ Tags */}
//             <div className="mb-6">
//               <label className="block mb-2 font-medium text-gray-900">
//                 Tags
//               </label>
//               <input
//                 type="text"
//                 name="tags"
//                 value={Array.isArray(tags) ? tags.join(", ") : ""}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//                 onChange={handleTagsChange}
//                 placeholder="Enter your tags..."
//               />
//             </div>

//             {/* Upload Image */}
//             <div className="mb-6">
//               <label htmlFor="upload" className="cursor-pointer flex items-center">
//                 <AiOutlinePlusCircle size={30} className="mt-3 text-gray-600" />
//                 <span className="ml-2">Upload Image</span>
//               </label>
//               <input
//                 type="file"
//                 name="image"
//                 id="upload"
//                 className="hidden"
//                 accept="image/*"
//                 required
//                 onChange={handleImageChange}
//               />

//               {/* Affichage de l'aperçu de l'image */}
//               {preview && (
//                 <div className="mt-4 relative">
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-32 h-32 object-cover rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Bouton de soumission */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-600 text-white p-2 rounded-lg w-full"
//             >
//               {loading ? "Loading..." : "Create Blog Post"}
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreateBlog;

import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../redux/actions/blog";
import { toast } from "react-toastify";
import Loader from "../../Layout/Loader";
import { useTranslation } from "react-i18next";
import English_language from "../../../Assests/image/langFlag/English_language.png";
import Arabic_language from "../../../Assests/image/langFlag/Arabic_language.png";
import French_language from "../../../Assests/image/langFlag/Flag_of_France.png";

const CreateProduct = () => {
  const { t } = useTranslation();
  const { success, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [Lang, setLang] = useState("AR");
  const { user } = useSelector((state) => state.user); // Récupérer l'utilisateur connecté

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState({ ar: "", fr: "", en: "" });
  const [content, setContent] = useState({ ar: "", fr: "", en: "" });
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(false);
  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setTags([]);
    setImage(null);
  };
  // Gestionnaire pour mettre à jour les tags
  const handleTagsChange = (e) => {
    const inputTags = e.target.value;
    const tagsArray = inputTags.split(",").map((tag) => tag.trim()); // Crée un tableau à partir des entrées séparées par des virgules
    setTags(tagsArray); // Mise à jour de l'état tags
  };
  useEffect(() => {
    if (error) toast.error(error);
    if (success) {
      toast.success("Blog created successfully!");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Récupérer le premier fichier uniquement
    if (file) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le loader
  
    const newForm = new FormData();
    if (image) newForm.append("image", image); // Ajouter l'image unique
  
    newForm.append("title[ar]", title.ar);
    newForm.append("title[fr]", title.fr);
    newForm.append("title[en]", title.en);
  
    newForm.append("content[ar]", content.ar);
    newForm.append("content[fr]", content.fr);
    newForm.append("content[en]", content.en);
  
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("author", user._id); // Ajouter l'ID de l'auteur (si nécessaire)
  
    try {
      await dispatch(createBlog(newForm)); // Dispatcher la création du blog
      alert("Blog créé avec succès !"); // Message de succès
      resetForm(); // Réinitialiser le formulaire après succès
    } catch (error) {
      alert("Erreur lors de la création du blog !"); // Message d'erreur
    } finally {
      setLoading(false); // Arrêter le loader
    }
  };
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pb-8 px-10 mt-10 bg-white border w-[70%] border-gray-200 rounded-lg shadow-sm">
          <h1 className="text-xl py-4 font-semibold text-gray-900 sm:text-2xl">
            {t("Create Blog")}
          </h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Langue */}
            <div className="mb-8 flex justify-center items-center flex-col">
              <p className="block mb-5 uppercase font-medium text-gray-900">
                {t("Choose The Language")} :
              </p>
              <div className="flex w-full justify-around items-center">
                {[
                  { lang: "EN", img: English_language },
                  { lang: "AR", img: Arabic_language },
                  { lang: "FR", img: French_language },
                ].map(({ lang, img }) => (
                  <div
                    key={lang}
                    onClick={() => setLang(lang)}
                    className={`cursor-pointer w-[20%] py-2 flex justify-center items-center bg-gray-50 border-2 ${
                      Lang === lang ? "border-primary-400" : "border-gray-300"
                    } rounded-md`}
                  >
                    <img src={img} className="w-10" alt={`${lang} Flag`} />
                    <span className="ml-3 font-semibold">{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Champs multilingues */}
            {["EN", "AR", "FR"].map(
              (lang) =>
                Lang === lang && (
                  <div key={lang}>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-900">
                        {t("Title")} {lang}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={title[lang.toLowerCase()]}
                        name="title"
                        onChange={(e) =>
                          setTitle({
                            ...title,
                            [lang.toLowerCase()]: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder={`Enter title in ${lang}...`}
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-900">
                        {t("Content")} {lang}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows="8"
                        value={content[lang.toLowerCase()]}
                        name="content"
                        onChange={(e) =>
                          setContent({
                            ...content,
                            [lang.toLowerCase()]: e.target.value,
                          })
                        }
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder={`Enter content in ${lang}...`}
                      ></textarea>
                    </div>
                  </div>
                )
            )}

            {/* Catégorie */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900">
                {t("Category")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter category..."
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900">
                {t("Tags")}
              </label>
              <input
                type="text"
                name="tags"
                value={tags.join(",")}
                onChange={handleTagsChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter tags..."
              />
            </div>

            {/* Upload Image */}
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-900">
                {t("Upload Image")}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
              />

              {/* Aperçu de l'image */}
              {image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="ml-4 text-red-500"
                  >
                    {t("Remove")}
                  </button>
                </div>
              )}
            </div>

            {/* Bouton Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {t("Create Blog")}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
