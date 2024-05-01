"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Dish = new mongoose_1.default.Schema({
    name: { type: String, trim: true, default: '' },
    price: { type: Number, trim: true, default: '' },
    ingredients: [{ type: String, trim: true, default: '' }],
    tags: [{ type: String, trim: true, default: '' }],
    restaurants: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Restaurant' }]
});
exports.default = mongoose_1.default.model('Dish', Dish);