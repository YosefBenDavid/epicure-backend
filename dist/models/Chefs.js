"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema for the Chef entity
const chefSchema = new mongoose_1.Schema({
    name: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    restaurants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Restaurant" }],
});
// Export the Chef model
exports.default = (0, mongoose_1.model)("Chef", chefSchema);
