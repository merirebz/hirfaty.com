const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {

    const {token} = req.cookies;
    if(!token){
        console.log("Token is missing in cookies.");
        return next(new ErrorHandler("Please login to continue", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            console.log("User not found in database.");
            return next(new ErrorHandler("User not found", 401));
        }

        console.log("Authentication successful:", req.user.id);
        next();
    } catch (error) {
        console.error("Error verifying token:", error.message);
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});


exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        console.log("Seller token is missing in cookies.");
        return next(new ErrorHandler("Please login to continue", 401));
    }

    try {
        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
        req.seller = await Shop.findById(decoded.id);

        if (!req.seller) {
            console.log("Seller not found in database.");
            return next(new ErrorHandler("Seller not found", 401));
        }

        console.log("Seller authentication successful:", req.seller.id);
        next();
    } catch (error) {
        console.error("Error verifying seller token:", error.message);
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}