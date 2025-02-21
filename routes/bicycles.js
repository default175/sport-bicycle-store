const express = require("express");
const Bicycle = require("../models/Bicycle");
const { auth, admin } = require("../middleware/authMiddleware.js");
const router = express.Router();

// ✅ Получить все велосипеды (доступно всем)
router.get("/", async (req, res) => {
    const bicycles = await Bicycle.find();
    res.json(bicycles);
});

// ✅ Получить один велосипед по ID (доступно всем)
router.get("/:id", async (req, res) => {
    const bicycle = await Bicycle.findById(req.params.id);
    if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });
    res.json(bicycle);
});

// ✅ Добавить новый велосипед (Только админ)
router.post("/", auth, admin, async (req, res) => {
    const bicycle = new Bicycle(req.body);
    await bicycle.save();
    res.status(201).json(bicycle);
});

// ✅ Обновить велосипед (Только админ)
router.put("/:id", auth, admin, async (req, res) => {
    const bicycle = await Bicycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });
    res.json(bicycle);
});

// ✅ Удалить велосипед (Только админ)
router.delete("/:id", auth, admin, async (req, res) => {
    const bicycle = await Bicycle.findByIdAndDelete(req.params.id);
    if (!bicycle) return res.status(404).json({ message: "Bicycle not found" });
    res.json({ message: "Bicycle deleted" });
});

module.exports = router;
