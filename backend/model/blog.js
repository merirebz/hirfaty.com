// //  const mongoose = require('mongoose');

// // // const BlogSchema = new mongoose.Schema({
// // //   title: {
// // //     fr: { type: String, required: true },
// // //     ar: { type: String },
// // //     en: { type: String }
// // //   },
// // //   content: {
// // //     fr: { type: String, required: true },
// // //     ar: { type: String },
// // //     en: { type: String }
// // //   },
// // //   category: { type: String, required: true },
// // //   tags: { type: [String], required: true },
// // //   image: { type: String, required: true },
// // //   author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // // });

// // // module.exports = mongoose.model('Blog', BlogSchema);
// // const BlogSchema = new mongoose.Schema({
// //   title: {
// //     fr: {  type: String, required: true,},
// //     ar: String,
// //     en: String
    
// //   },
// //   content: {
// //    fr:{ type: String},
// //    ar: String,
// //    en: String
    
// //   },
// //   category: {
// //    fr:{ type: String},
// //    ar: String,
// //    en: String
    
// //   },
// //   tags: {
// //    fr:{ type: [String]},
// //    ar: String,
// //    en: String
    
// //   },
// //   image: {
// //     type: String, 
// //     required: true,
// //   },
// //   author: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User', // Assuming your author is a reference to a User model
// //     required: true,
// //   },
// // });

// // module.exports = mongoose.model('Blog', BlogSchema);


// // const mongoose = require('mongoose');

// // const blogSchema = new mongoose.Schema({
// //   title: {
// //     fr: String,
// //     ar: String,
// //     en: String
// //   },
// //   content: {
// //     fr: String,
// //     ar: String,
// //     en: String
// //   },
// //   category: {
// //     fr: String,
// //     ar: String,
// //     en: String
// //   },
// //   tags: String, // Un simple string pour les tags séparés par des virgules
// //   author: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User' // assuming you have a User model
// //   }
// // });

// // const Blog = mongoose.model('Blog', blogSchema);
// // module.exports = Blog;

// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type:String,
//     },
//     content: {
//       type:String,
//     },
//     category: {
//        type: String, 
      
//     },
//     tags: {
//        type: [String],  // Tableau de chaînes (ex: ["tech", "web"])
      
//     },
//     image: {
//       type: String, // Stocke le nom du fichier (ex: "1707263917-image.jpg")
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true } // Ajoute createdAt et updatedAt
// );

// const Blog = mongoose.model("Blog", blogSchema);
// module.exports = Blog;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour le blog
const blogSchema = new Schema(
  {
    title: {
      en: { type: String, },
      ar: { type: String,  },
      fr: { type: String,  },
    },
    content: {
      en: { type: String,  },
      ar: { type: String,  },
      fr: { type: String, },
    },
    category: { type: String,  },
    tags: [{ type: String ,  }], // Tableau de tags
    image: { type: String , }, // URL de l'image
    author: {
            type: mongoose.Schema.Types.ObjectId,
           ref: "User",
        },  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt automatiquement
  }
);

// Création du modèle
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
