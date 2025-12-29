
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
    tags: [{ type: String ,  }], 
    image: { type: String , }, 
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
