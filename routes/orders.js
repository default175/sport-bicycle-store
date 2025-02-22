const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const { createOrder, getOrders, getUserOrders, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();


router.post("/", auth, createOrder);


router.get("/", auth, admin, getOrders);


router.get("/my-orders", auth, getUserOrders);


router.put("/:id", auth, admin, updateOrderStatus);

module.exports = router;
