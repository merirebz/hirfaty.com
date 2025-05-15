const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    ar: { type: String, required: [true, "Please enter your product name!"] },
    en: String,
    fr: String,
  },
  description: {
    ar: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    en: String,
    fr: String,
  },
  category: {
    type: Object,
    // required: [true, "Please enter your product category!"],
  },
  subCategory: {
    type: Object,
    // required: [false, "Please enter your product subCategory!"],
  },
  certificate: {
    type: Boolean,
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  ratings: {
    type: Number,
  },
  typeofcertificate: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
