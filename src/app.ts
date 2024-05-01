import express, { Request, Response } from "express";
import { connectToDatabase } from "./database";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Connect to the database
connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB from app.ts");
    // Start the server after successfully connecting to the database
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    console.error(
      "Make sure MongoDB is running and the connection URL is correctly set in your .env file."
    );
    process.exit(1);
  });

app.get("/", async (req: Request, res: Response) => {
  try {

    res.send("Hello boy Worldo!!");

  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
