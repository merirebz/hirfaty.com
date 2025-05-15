const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
 const bcrypt = require('bcrypt');
 const crypto = require("crypto");


router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email, name, password, typeShop, address, sector, phoneNumber, zipCode } = req.body;

    if (!email || !name || !password || !typeShop || !sector || !phoneNumber || !zipCode) {
      return next(new ErrorHandler("Please fill in all fields", 400));
    }

    if (!req.file) {
      return next(new ErrorHandler("Please upload a Logo", 400));
    }

    const LowerCaseEmail = email.toLowerCase();
    const sellerEmail = await Shop.findOne({ email: LowerCaseEmail });

    if (sellerEmail) {
      return next(new ErrorHandler("Email already registered with another seller account", 401));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    // Créer un token d'activation avec les infos de l'utilisateur (mais sans l'ajouter en DB)
    const activationToken = jwt.sign(
      { name, email: LowerCaseEmail, password, avatar: fileUrl, address, typeShop, sector, phoneNumber, zipCode },
      process.env.ACTIVATION_SECRET,
      { expiresIn: "30m" } // Expire après 30 minutes
    );

    const activationUrl = `${process.env.CLIENT_URL}/seller/activation/${activationToken}`;

    // Envoi de l'email avec le lien d'activation
    try {
      await sendMail({
        email: LowerCaseEmail,
        subject: "Activate your Shop",
        message: `Hello ${name}, Marhba bik f Ecommerce connect. Please click the link to activate your shop: ${activationUrl}`,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Failed to send activation email", 500));
    }

    res.status(200).json({
      message: "Shop activation email sent. Please check your email to activate your shop.",
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "30m",
  });
};


router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      console.log("🔐 Received Token:", activation_token); // Debug

      if (!activation_token) {
        return next(new ErrorHandler("No activation token provided", 400));
      }

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid or expired token", 400));
      }

      const { name, email, password, avatar, address, typeShop, sector, phoneNumber, zipCode } = newSeller;

      let existingSeller = await Shop.findOne({ email });

      if (existingSeller) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      // Créer le seller sans hachage du mot de passe
      const seller = await Shop.create({
        name,
        email,
        password, // Mot de passe en clair
        avatar,
        address,
        typeShop,
        sector,
        phoneNumber,
        zipCode,
      });

      sendToken(seller, 201, res); // Assure-toi que sendToken est bien adapté pour les sellers
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const LowerCaseEmail = email.toLowerCase();

      const user = await Shop.findOne({ email: LowerCaseEmail }).select(
        "+password"
      );

      if (!user) {
        return next(
          new ErrorHandler("Please provide the correct information", 401)
        );
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 401)
        );
      }

      sendShopToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await Shop.findById(req.seller._id);

      const existAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body.address);
      const {
        name,
        description,
        address,
        phoneNumber,
        zipCode,
        country,
        accountManager,
        otherShop,
        city,
        companyId,
        numberICE,
        tva,
        TitleOfTheAccount,
        BankAccountNumber,
        iban,
        bankName,
        bic,
        codeBank,
        idBank,
      } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }
      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;
      shop.country = country;
      shop.accountManager = accountManager;
      shop.otherShop = otherShop;
      shop.city = city;
      shop.companyId = companyId;
      shop.numberICE = numberICE;
      shop.tva = tva;
      shop.TitleOfTheAccount = TitleOfTheAccount;
      shop.BankAccountNumber = BankAccountNumber;
      shop.iban = iban;
      shop.bankName = bankName;
      shop.bic = bic;
      shop.codeBank = codeBank;
      shop.idBank = idBank;
      console.log(shop);
      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update fileCompanyId
router.put(
  "/update-fileCompanyId",
  isSeller,
  upload.single("fileCompanyId"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.seller._id);

      const existsUser = await Shop.findById(req.seller._id);
      console.log(existsUser.fileCompanyId);
      const existAvatarPath = `uploads/${existsUser.fileCompanyId}`;
      // if (existsUser.fileCompanyId) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      
      const fileUrl = path.join(req.file.filename);
     

      const shop = await Shop.findByIdAndUpdate(req.seller._id, {
        fileCompanyId: fileUrl,
      });

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update file registry extract
router.put(
  "/update-RegistryExtract",
  isSeller,
  upload.single("RegistryExtract"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.seller._id);

      const existsUser = await Shop.findById(req.seller._id);
      const fileUrl = path.join(req.file.filename);
      const shop = await Shop.findByIdAndUpdate(req.seller._id, {
        registryExtract: fileUrl,
      });

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers --- for admin
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller ---admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(
          new ErrorHandler("Seller is not available with this id", 400)
        );
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Seller deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods --- sellers
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method/",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Seller not found with this id", 400));
      }

      seller.withdrawMethod = null;

      await seller.save();

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);





// Forgot Password Route
router.post(
  "/forgot-password-seller",
  catchAsyncErrors(async (req, res, next) => {
    const user = await Shop.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password-seller/${resetToken}`;
    const message = `Click the link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, ignore this email.`;

    await sendMail({ email: user.email, subject: "Password Reset", message });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  })
);

// Reset Password Route
router.put(
  "/reset-password-seller/:token",
  catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await Shop.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  })
);



module.exports = router;
