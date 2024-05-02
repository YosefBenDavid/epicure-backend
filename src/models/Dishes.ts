import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Dish extends Document {
    name: string;
    price: number;
    ingredients: string[];
    tags: string[];
    restaurants: Types.ObjectId[];
}

const dishSchema: Schema<Dish> = new Schema<Dish>({
    name: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    ingredients: [{ type: String, trim: true }],
    tags: [{ type: String, trim: true }],
    restaurants: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }]
});

export default mongoose.model<Dish>('Dish', dishSchema);
