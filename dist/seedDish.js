"use strict";
// // seed.ts
// import mongoose from 'mongoose';
// import DishModel from './models/Dishes';
// import dotenv from 'dotenv';
// // Load environment variables from .env file
// dotenv.config();
// // MongoDB connection URI
// const MONGO_URI = process.env.MONGO_URL;
// // Check if MONGO_URI is provided
// if (!MONGO_URI) {
//     throw new Error('MongoDB connection URL (MONGO_URL) is not provided in the environment variables. Make sure to set it in your .env file.');
// }
// // Define seed data
// const dishes = [
//   { name: 'Dish 1', price: 10, ingredients: ['Ingredient 1', 'Ingredient 2'], tags: ['Tag 1', 'Tag 2'], restaurants: [] },
//   { name: 'Dish 2', price: 15, ingredients: ['Ingredient 3', 'Ingredient 4'], tags: ['Tag 2', 'Tag 3'], restaurants: [] },
//   // Add more dishes as needed
// ];
// // Connect to MongoDB
// mongoose.connect(MONGO_URI)
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     // Insert dishes into the database
//     await DishModel.insertMany(dishes);
//     console.log('Seed data inserted successfully');
//   })
//   .catch((error) => {
//     console.error('Error seeding data:', error);
//   })
//   .finally(() => {
//     // Close the MongoDB connection
//     mongoose.connection.close();
//   });
