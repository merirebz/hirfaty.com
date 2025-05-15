const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Blog = require("../model/blog");
const fs = require("fs");
const multer = require('multer');
const path = require("path");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");



router.post(
  "/admin-create-blog",
  upload.single("image"), // On accepte une seule image
  catchAsyncErrors(async (req, res, next) => {
    try {
    
      const blogData = {
        title: {
          ar: req.body.title.ar,
          fr: req.body.title.fr,
          en: req.body.title.en,
        },
        content: {
          ar: req.body.content.ar,
          fr: req.body.content.fr,
          en: req.body.content.en,
        },
        category: req.body.category || '',
        tags: req.body.tags,
        author:req.body.author,
        // image:req.file.filename,
      };
     
      console.log("Headers reçus :", req.headers);
      console.log("Received blog data:", req.body);
      console.log("Blog title (AR):", req.body.title?.ar);
      console.log("Blog title (FR):", req.body.title?.fr);
      console.log("Blog title (EN):", req.body.title?.en);

      const blog = new Blog(blogData);
      console.log('Blog data to be saved:', blogData);

      await blog.save();

      console.log("Uploaded file:", req.file); // Vérifie si l'image est bien dans req.file

// Si une image a été envoyée
if (req.file) {
  const newFilename = `${blog._id}${path.extname(req.file.originalname)}`;
  const newPath = path.join("uploads", newFilename);
  
  fs.renameSync(req.file.path, newPath);
  blog.image = newFilename;
  await blog.save();
} else {
  console.log("No image uploaded.");
}
      

      res.status(201).json({
        success: true,
        blog,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);




// Get all blogs
router.get(
  "/all-blogs",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        blogs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get single blog
router.get(
  "/get-blog/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update blog
router.put(
  "/update-blog/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogUpdate = req.body;
      const blogUpdated = await Blog.findByIdAndUpdate(
        req.params.id,
        { $set: blogUpdate },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json({
        success: true,
        blogUpdated,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete blog
router.delete(
  "/delete-blog/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;
      const blogData = await Blog.findById(blogId);

      if (!blogData) {
        return res.status(404).json({ success: false, message: "Blog not found with this id!" });
      }

      // Optionnel : Vérifier si l'utilisateur est l'auteur du blog avant suppression
      if (blogData.author.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: "Unauthorized! You can only delete your own blog." });
      }

      if (blogData.image) {
        blogData.image.forEach((imageUrl) => {
          const filePath = `uploads/${imageUrl}`;
          fs.unlink(filePath, (err) => {
            if (err) console.log(err);
          });
        });
      }

      await Blog.findByIdAndDelete(blogId);

      res.status(200).json({
        success: true,
        message: "Blog deleted successfully!",
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  })
);


// Get all blogs for admin
router.get(
  "/admin-blogs",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        blogs,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update blog images
router.post(
  "/update-blog-images/:id",
  isAuthenticated,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);

      // Remove old images
      blog.images.forEach((imageUrl) => {
        const oldImage = imageUrl;
        try {
          fs.unlinkSync(path.join("uploads", oldImage));
        } catch (err) {
          console.error(`Failed to delete old image: ${err.message}`);
        }
      });

      const newImagePaths = req.files.map((file) => {
        let newFilename = file.filename;
        let newPath = path.join("uploads", newFilename);
        fs.renameSync(file.path, newPath);
        return newFilename;
      });

      blog.images = newImagePaths;
      await blog.save();

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
