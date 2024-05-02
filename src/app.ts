import express, { ErrorRequestHandler } from "express";
import { connectToDatabase } from "./database";
import dotenv from "dotenv";
import chefRoutes from "./routes/chefRoutes";
import dishRoutes from "./routes/dishRoutes";
import restaurantRoutes from "./routes/restaurantRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Connect to the database and start the server
connectToDatabase()
  .then((db) => { // Receive db instance
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
app.use("/chefs", chefRoutes);
app.use("/dishes", dishRoutes);
app.use("/restaurants", restaurantRoutes);

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(errorHandler);

export default app;