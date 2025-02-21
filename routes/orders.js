const express = require("express");
const { auth, admin } = require("../middleware/authMiddleware");
const { createOrder, getOrders, getUserOrders, updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();

// ✅ Создание заказа (только для авторизованных пользователей)
router.post("/", auth, createOrder);

// ✅ Получение всех заказов (только админ)
router.get("/", auth, admin, getOrders);

// ✅ Получение заказов конкретного пользователя
router.get("/my-orders", auth, getUserOrders);

// ✅ Обновление статуса заказа (только админ)
router.put("/:id", auth, admin, updateOrderStatus);

module.exports = router;
