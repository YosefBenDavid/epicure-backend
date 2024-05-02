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
exports.deleteChefById = exports.updateChefById = exports.createChef = exports.getChefById = exports.getAllChefs = void 0;
const Chefs_1 = __importDefault(require("../models/Chefs")); // Import the Chef model
// Controller functions
function getAllChefs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chefs = yield Chefs_1.default.find();
            res.json(chefs);
        }
        catch (error) {
            console.error("Error fetching chefs:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllChefs = getAllChefs;
function getChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const chef = yield Chefs_1.default.findById(id);
            if (!chef) {
                return res.status(404).json({ error: "Chef not found" });
            }
            res.json(chef);
        }
        catch (error) {
            console.error("Error fetching chef:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getChefById = getChefById;
function createChef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, image, description, restaurants } = req.body;
            // Create a new chef instance
            const newChef = new Chefs_1.default({ name, image, description, restaurants });
            yield newChef.save();
            res.status(201).json(newChef);
        }
        catch (error) {
            console.error("Error creating chef:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.createChef = createChef;
function updateChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updatedChef = yield Chefs_1.default.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            if (!updatedChef) {
                return res.status(404).json({ error: "Chef not found" });
            }
            res.json(updatedChef);
        }
        catch (error) {
            console.error("Error updating chef:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateChefById = updateChefById;
function deleteChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedChef = yield Chefs_1.default.findByIdAndDelete(id);
            if (!deletedChef) {
                return res.status(404).json({ error: "Chef not found" });
            }
            res.json({ message: "Chef deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting chef:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.deleteChefById = deleteChefById;
