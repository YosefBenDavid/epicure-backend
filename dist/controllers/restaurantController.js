"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantById = exports.updateRestaurantById = exports.createRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const Restaurants_1 = __importDefault(require("../models/Restaurants"));
// Controller functions
function getAllRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurants = yield Restaurants_1.default.find().populate('chef').populate('dishes');
            res.json(restaurants);
        }
        catch (error) {
            console.error("Error fetching restaurants:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const restaurant = yield Restaurants_1.default.findById(id).populate('chef').populate('dishes');
            if (!restaurant) {
                return res.status(404).json({ error: "Restaurant not found" });
            }
            res.json(restaurant);
        }
        catch (error) {
            console.error("Error fetching restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getRestaurantById = getRestaurantById;
function createRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, image, chef, dishes } = req.body;
            // Validate input data
            if (!name || !image || !chef || !Array.isArray(dishes)) {
                return res.status(400).json({ error: "Invalid data provided" });
            }
            const newRestaurant = new Restaurants_1.default({ name, image, chef, dishes });
            yield newRestaurant.save();
            res.status(201).json(newRestaurant);
        }
        catch (error) {
            console.error("Error creating restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.createRestaurant = createRestaurant;
function updateRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updatedRestaurant = yield Restaurants_1.default.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedRestaurant) {
                return res.status(404).json({ error: "Restaurant not found" });
            }
            res.json(updatedRestaurant);
        }
        catch (error) {
            console.error("Error updating restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateRestaurantById = updateRestaurantById;
function deleteRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedRestaurant = yield Restaurants_1.default.findByIdAndDelete(id);
            if (!deletedRestaurant) {
                return res.status(404).json({ error: "Restaurant not found" });
            }
            res.json({ message: "Restaurant deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.deleteRestaurantById = deleteRestaurantById;
