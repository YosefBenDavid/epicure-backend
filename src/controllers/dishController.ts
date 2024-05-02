import { Request, Response } from 'express';
import Dish from '../models/Dishes'; // Import DishModel instead of Dish

// Controller function to get all dishes
export async function getAllDishes(req: Request, res: Response) {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getDishById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const dish = await Dish.findById(id); // Use DishModel
        if (!dish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.json(dish);
    } catch (error) {
        console.error("Error fetching dish:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createDish(req: Request, res: Response) {
    try {
        const { name, price, ingredients, tags, restaurants } = req.body;

        const newDish = new Dish({ name, price, ingredients, tags, restaurants }); // Use DishModel without specifying the type

        await newDish.save();

        res.status(201).json(newDish);
    } catch (error) {
        console.error("Error creating dish:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateDishById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const updatedDish = await Dish.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedDish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.json(updatedDish);
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteDishById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const deletedDish = await Dish.findByIdAndDelete(id);
        if (!deletedDish) {
            return res.status(404).json({ error: "Dish not found" });
        }
        res.json({ message: "Dish deleted successfully" });
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
