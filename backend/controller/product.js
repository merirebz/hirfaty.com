const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const PromoProduct = require("../model/promoProduct");

const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");
const promoProduct = require("../model/promoProduct");

// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("Headers reçus :", req.headers);
      console.log("Received product data:", req.body); // <-- Ajout ici
      console.log("Product name in Arabic:", req.body.name?.ar);
console.log("Product name in English:", req.body.name?.en);
console.log("Product name in French:", req.body.name?.fr);

      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const productData = req.body;

        productData.shop = shop;
 
        const product = new Product(productData);
        await product.save();

        const imagePaths = req.files.map((file, index) => {
          let newFilename;
          if (index === 0) {
            newFilename = `${product._id}.png`;
            let newPath = path.join("uploads", newFilename);
            fs.renameSync(file.path, newPath);
          } else {
            newFilename = file.filename;
          }
          return newFilename;
        });

        product.images = imagePaths;
        await product.save();

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// create promo product
// router.post(
//   "/create-promo-product",
//   upload.array("images"),
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const shopId = req.body.shopId;
//       const shop = await Shop.findById(shopId);
//       if (!shop) {
//         return next(new ErrorHandler("Shop Id is invalid!", 400));
//       } else {
//         const files = req.files;
//         const imageUrls = files.map((file) => `${file.filename}`);

//         const productData = req.body;
//         productData.images = imageUrls;
//         productData.shop = shop;

//         const product = await PromoProduct.create(productData);

//         res.status(201).json({
//           success: true,
//           product,
//         });
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
router.post(
  "/create-promo-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        const productData = req.body;
        productData.shop = shop;

        // Création du produit avant d'ajouter les images
        const product = new PromoProduct(productData);
        await product.save();

        // Gestion des images
        const imagePaths = req.files.map((file, index) => {
          let newFilename;
          if (index === 0) {
            // Renommer la première image avec l'ID du produit
            newFilename = `${product._id}.png`;
            let newPath = path.join("uploads", newFilename);
            fs.renameSync(file.path, newPath);
          } else {
            newFilename = file.filename;
          }
          return newFilename;
        });

        // Ajouter les images au produit
        product.images = imagePaths;
        await product.save();

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get Get products
router.get(
  "/get-products/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete PROMO product of a shop
router.delete(
  "/delete-promo-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await promoProduct.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const product = await promoProduct.findByIdAndDelete(productId);

      if (!product) {
        return next(
          new ErrorHandler(" Promo Product not found with this id!", 500)
        );
      }

      res.status(201).json({
        success: true,
        message: " Promo Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all promo products
router.get(
  "/get-all-promo-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await promoProduct.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Update product
router.put(
  "/update-product/:id",
  isSeller,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productUpdate = req.body;
      const productUpdated = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: productUpdate },
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );
      res.status(201).json({
        success: true,
        productUpdated,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update images
router.post(
  "/update-product-images/:id",
  isSeller,
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      // Remove the old image with the product ID
      const oldImage = product.images.find((image) =>
        image.includes(product._id)
      );
      if (oldImage) {
        try {
          fs.unlinkSync(path.join("uploads", oldImage)); // Adjust path as needed
        } catch (err) {
          console.error(`Failed to delete old image: ${err.message}`);
        }
      }

      const newImagePaths = req.files.map((file, index) => {
        let newFilename;
        if (index === 0) {
          newFilename = `${product._id}.png`;
          let newPath = path.join("uploads", newFilename);
          fs.renameSync(file.path, newPath);
        } else {
          newFilename = file.filename;
        }
        return newFilename;
      });

      // Replace the old image with the new ones
      product.images = newImagePaths;
      await product.save();

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
