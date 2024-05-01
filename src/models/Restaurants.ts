import mongoose from 'mongoose';

const Restaurant = new mongoose.Schema({
    name: { type: String, trim: true, default: '' }, 
    image: { type: String, trim: true, default: '' }, 
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

export default mongoose.model('Restaurant', Restaurant);
