"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Restaurant = new mongoose_1.default.Schema({
    name: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    chef: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Chef' },
    dishes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Dish' }]
});
exports.default = mongoose_1.default.model('Restaurant', Restaurant);
