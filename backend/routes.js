const express = require("express");
const router = express.Router();
// import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");
const news = require("./controller/newsletter");
const blogs = require("./controller/blog")
 
router.use("/user", user);
router.use("/conversation", conversation);
router.use("/message", message);
router.use("/order", order);
router.use("/shop", shop);
router.use("/product", product);
router.use("/event", event);
router.use("/coupon", coupon);
router.use("/payment", payment);
router.use("/withdraw", withdraw);
router.use("/news", news);
router.use("/blogs",blogs);


module.exports = router;
