import Chef from "../models/Chefs"; // Import the Chef model
import { Request, Response } from "express";

// Controller functions
export async function getAllChefs(req: Request, res: Response) {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getChefById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const chef = await Chef.findById(id);
    if (!chef) {
      return res.status(404).json({ error: "Chef not found" });
    }
    res.json(chef);
  } catch (error) {
    console.error("Error fetching chef:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createChef(req: Request, res: Response) {
  try {
    const { name, image, description, restaurants } = req.body;

    // Create a new chef instance
    const newChef = new Chef({ name, image, description, restaurants });

    await newChef.save();

    res.status(201).json(newChef);
  } catch (error) {
    console.error("Error creating chef:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateChefById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const updatedChef = await Chef.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedChef) {
      return res.status(404).json({ error: "Chef not found" });
    }
    res.json(updatedChef);
  } catch (error) {
    console.error("Error updating chef:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteChefById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const deletedChef = await Chef.findByIdAndDelete(id);
    if (!deletedChef) {
      return res.status(404).json({ error: "Chef not found" });
    }
    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    console.error("Error deleting chef:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
