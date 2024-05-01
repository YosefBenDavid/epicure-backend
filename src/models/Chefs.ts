import mongoose from 'mongoose';

const Chef = new mongoose.Schema({
    name: { type: String, trim: true, default: '' }, 
    image: { type: String, trim: true, default: '' }, 
    description: { type: String, trim: true, default: '' },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

export default mongoose.model('Chef', Chef);
