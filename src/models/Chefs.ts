import { Document, Schema, model, Types } from "mongoose";

// Define a type for the Chef entity
interface Chef extends Document {
  name: string;
  image: string;
  description: string;
  restaurants?: Types.ObjectId[]; // Optional field for restaurants
}

// Define the schema for the Chef entity
const chefSchema: Schema<Chef> = new Schema<Chef>({
  name: { type: String, trim: true, default: "" },
  image: { type: String, trim: true, default: "" },
  description: { type: String, trim: true, default: "" },
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
});

// Export the Chef model
export default model<Chef>("Chef", chefSchema);
