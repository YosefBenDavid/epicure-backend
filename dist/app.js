"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const dotenv_1 = __importDefault(require("dotenv"));
const chefRoutes_1 = __importDefault(require("./routes/chefRoutes"));
const dishRoutes_1 = __importDefault(require("./routes/dishRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Parse JSON request bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// Connect to the database and start the server
(0, database_1.connectToDatabase)()
    .then((db) => {
    console.log("Connected to MongoDB from app.ts");
    // Start the server after successfully connecting to the database
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // Use db instance as needed
    app.set('mongoDB', db);
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Terminate the application on database connection error
});
// Routes
app.use("/chefs", chefRoutes_1.default);
app.use("/dishes", dishRoutes_1.default);
app.use("/restaurants", restaurantRoutes_1.default);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
};
app.use(errorHandler);
exports.default = app;
