const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bicycleRoutes = require("./routes/bicycles");
const orderRoutes = require("./routes/orders");


dotenv.config();
const app = express();


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/bicycles", bicycleRoutes);
app.use("/api/orders", orderRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
