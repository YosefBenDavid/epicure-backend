import { Request, Response } from 'express';
import Restaurant from '../models/Restaurants';

// Controller functions
export async function getAllRestaurants(req: Request, res: Response) {
    try {
        const restaurants = await Restaurant.find().populate('chef').populate('dishes');
        res.json(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getRestaurantById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findById(id).populate('chef').populate('dishes');
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createRestaurant(req: Request, res: Response) {
    try {
        const { name, image, chef, dishes } = req.body;

        // Validate input data
        if (!name || !image || !chef || !Array.isArray(dishes)) {
            return res.status(400).json({ error: "Invalid data provided" });
        }

        const newRestaurant = new Restaurant({ name, image, chef, dishes });

        await newRestaurant.save();

        res.status(201).json(newRestaurant);
    } catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function updateRestaurantById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json(updatedRestaurant);
    } catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteRestaurantById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
