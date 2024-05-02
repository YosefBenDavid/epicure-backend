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
exports.deleteDishById = exports.updateDishById = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const Dishes_1 = __importDefault(require("../models/Dishes")); // Import DishModel instead of Dish
// Controller function to get all dishes
function getAllDishes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dishes = yield Dishes_1.default.find();
            res.json(dishes);
        }
        catch (error) {
            console.error("Error fetching dishes:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllDishes = getAllDishes;
function getDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const dish = yield Dishes_1.default.findById(id); // Use DishModel
            if (!dish) {
                return res.status(404).json({ error: "Dish not found" });
            }
            res.json(dish);
        }
        catch (error) {
            console.error("Error fetching dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getDishById = getDishById;
function createDish(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, price, ingredients, tags, restaurants } = req.body;
            const newDish = new Dishes_1.default({ name, price, ingredients, tags, restaurants }); // Use DishModel without specifying the type
            yield newDish.save();
            res.status(201).json(newDish);
        }
        catch (error) {
            console.error("Error creating dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.createDish = createDish;
function updateDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updatedDish = yield Dishes_1.default.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedDish) {
                return res.status(404).json({ error: "Dish not found" });
            }
            res.json(updatedDish);
        }
        catch (error) {
            console.error("Error updating dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateDishById = updateDishById;
function deleteDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedDish = yield Dishes_1.default.findByIdAndDelete(id);
            if (!deletedDish) {
                return res.status(404).json({ error: "Dish not found" });
            }
            res.json({ message: "Dish deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.deleteDishById = deleteDishById;
