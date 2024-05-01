import mongoose from 'mongoose';

const Dish = new mongoose.Schema({
    name: { type: String, trim: true, default: '' }, 
    price: { type: Number, trim: true, default: '' }, 
    ingredients: [{ type: String, trim: true, default: '' }],
    tags:[{ type: String, trim: true, default: '' }],
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

export default mongoose.model('Dish', Dish);
