const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, isAdmin: isAdmin || false });

        await user.save();

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Проверяем, есть ли такой пользователь
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
