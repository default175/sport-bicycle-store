const Order = require("../models/Order");
const Bicycle = require("../models/Bicycle");


const createOrder = async (req, res) => {
    try {
        const { bicycleId, quantity } = req.body;

        if (!bicycleId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const bicycle = await Bicycle.findById(bicycleId);
        if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });

        if (bicycle.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }


        const totalPrice = bicycle.price * quantity;


        bicycle.stock -= quantity;
        await bicycle.save();

        const order = new Order({
            user: req.user.id,
            bicycle: bicycleId,
            quantity,
            totalPrice
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("bicycle", "name price");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("bicycle", "name price");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ❗ Экспорт функций
module.exports = { createOrder, getOrders, getUserOrders, updateOrderStatus };
