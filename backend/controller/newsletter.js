const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const Newsletter = require("../model/newsletter.js");

router.post(
  "/subscribe",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        return next(new ErrorHandler("Email is required"), 400);
      }

      const LowerEmail = email.toLowerCase();

      const isExist = await Newsletter.findOne({ email: LowerEmail });
      if (isExist) {
        return next(new ErrorHandler("You have already subscribed"), 401);
      }

      const news = await Newsletter.create({
        email: LowerEmail,
      });

      if (!news) {
        return next(new ErrorHandler("Something went wrong try leater "), 500);
      }
      return res.status(201).json({
        success: true,
        message: "Subscribed successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
