const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const crypto = require("crypto");
const { PostHog } = require('posthog-node');

// Initialisation de PostHog avec les vraies valeurs
const posthog = new PostHog('phc_KYB9UTF8pm4kCzY0B1TXbMmVecjDeuQ4psoXbEsHuL2', {
  host: 'https://us.i.posthog.com',  // URL de l'instance de PostHog
  personProfiles: 'identified_only', // Créer des profils uniquement pour les utilisateurs identifiés
});


router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const LowerEmail = email.toLowerCase();
    const userEmail = await User.findOne({ email: LowerEmail });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 401));
    }

    const user = {
      name: name,
      email: LowerEmail,
      password: password,
      avatar: req.file ? path.join(req.file.filename) : "1168742.png",
    };

    // ✅ Générer le token d'activation
    const activationToken = createActivationToken(user);
    const activationLink = `${process.env.CLIENT_URL}/activation/${activationToken}`;

    console.log("🔗 Activation Link:", activationLink); // Debug

    // ✅ Envoyer l'email avec le lien
    try {
      console.log("📩 Tentative d'envoi d'email...");

      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name},\n\nClick the link below to activate your account:\n\n${activationLink}\n\nThis link expires in 5 minutes.`,
      });

      res.status(201).json({
        success: true,
        message: "Activation email sent! Please check your inbox.",
      });
    } catch (error) {
      return next(new ErrorHandler("Email could not be sent", 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
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

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid or expired token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        posthog.capture({
          distinctId: email.toLowerCase(), // Utilise l'email comme distinctId unique
          event: 'authentication_failed',  // Nom de l'événement
          properties: {
            reason: 'Missing fields',
            timestamp: new Date(),
          }
        });
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const LowerCaseEmail = email.toLowerCase();
      const user = await User.findOne({ email: LowerCaseEmail }).select("+password");

      if (!user) {
        posthog.capture({
          distinctId: email.toLowerCase(),
          event: 'authentication_failed',
          properties: {
            reason: 'User not found',
            timestamp: new Date(),
          }
        });
        return next(new ErrorHandler("Please provide the correct information", 401));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        posthog.capture({
          distinctId: email.toLowerCase(),
          event: 'authentication_failed',
          properties: {
            reason: 'Incorrect password',
            timestamp: new Date(),
          }
        });
        return next(new ErrorHandler("Please provide the correct information", 401));
      }

      // Connexion réussie - enregistre l'événement
      posthog.capture({
        distinctId: user._id.toString(), // Utilise l'ID utilisateur comme distinctId
        event: 'user_logged_in', // Nom de l'événement
        properties: {
          email: user.email,
          name: user.name,
          timestamp: new Date(),
        }
      });
      console.log("📡 Événement envoyé à PostHog: successful_login", { userId: user._id });
      // Envoi du token et réponse
      sendToken(user, 201, res);
    } catch (error) {
      posthog.capture({
        distinctId: 'system_error',
        event: 'server_error',
        properties: {
          message: error.message,
          stack: error.stack,
          timestamp: new Date(),
        }
      });
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      const existAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      console.log(addressId);

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user infoormation with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users --- for admin
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete users --- admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler("User is not available with this id", 400)
        );
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// Forgot Password Route
router.post(
  "/forgot-password",
  catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const message = `Click the link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, ignore this email.`;

    await sendMail({ email: user.email, subject: "Password Reset", message });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  })
);

// Reset Password Route
router.put(
  "/reset-password/:token",
  catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
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
