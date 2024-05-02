import mongoose, { Schema, Document } from 'mongoose';

export interface Restaurant extends Document {
    name: string;
    image?: string;
    chef: mongoose.Types.ObjectId;
    dishes: mongoose.Types.ObjectId[];
}

const restaurantSchema: Schema<Restaurant> = new Schema<Restaurant>({
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true },
    chef: { type: Schema.Types.ObjectId, ref: 'Chef', required: true },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

export default mongoose.model<Restaurant>('Restaurant', restaurantSchema);
